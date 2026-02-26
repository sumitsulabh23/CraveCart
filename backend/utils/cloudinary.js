const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        let folder = 'cravecart';
        if (req.baseUrl.includes('restaurants')) {
            folder = 'cravecart/restaurants';
        } else if (req.baseUrl.includes('foods')) {
            folder = 'cravecart/foods';
        }
        return {
            folder: folder,
            allowed_formats: ['jpg', 'png', 'jpeg']
        };
    }
});

const upload = multer({ storage: storage });

/**
 * Smartly fetches an image from a URL (direct or webpage) and uploads it to Cloudinary.
 * @param {string} url - The image or page URL.
 * @param {string} folder - The Cloudinary folder to upload to.
 * @returns {Promise<string>} - The Cloudinary secure_url.
 */
const smartFetchImage = async (url, folder) => {
    try {
        const axios = require('axios');
        let targetImageUrl = url;

        // If it's a webpage (not ending in common image extensions), try to find og:image
        const isLikelyWebPage = !/\.(jpg|jpeg|png|webp|gif|svg)$/i.test(url.split('?')[0]);

        if (isLikelyWebPage && url.startsWith('http')) {
            console.log(`Analyzing webpage for image: ${url}`);
            try {
                const { data: html } = await axios.get(url, {
                    headers: { 'User-Agent': 'Mozilla/5.0' },
                    timeout: 7000
                });

                // 1. Try OG image with more flexible regex
                const ogMatch = html.match(/property=["']og:image["']\s+content=["']([^"']+)["']/) ||
                    html.match(/content=["']([^"']+)["']\s+property=["']og:image["']/);

                // 2. Try Twitter image
                const twitterMatch = html.match(/name=["']twitter:image["']\s+content=["']([^"']+)["']/) ||
                    html.match(/content=["']([^"']+)["']\s+name=["']twitter:image["']/);

                // 3. Try JSON-LD (very reliable for specific entities like dishes/restaurants)
                const jsonLdMatch = html.match(/"image":\s*["']([^"']+)["']/) ||
                    html.match(/@type":\s*["']ImageObject["'].*?"url":\s*["']([^"']+)["']/s);

                let bestImageUrl = null;

                // Prioritization: JSON-LD (usually most specific) > OG > Twitter
                if (jsonLdMatch && jsonLdMatch[1] && !jsonLdMatch[1].includes('placeholder')) {
                    bestImageUrl = jsonLdMatch[1];
                    console.log(`Found high-quality JSON-LD image: ${bestImageUrl}`);
                } else if (ogMatch && ogMatch[1]) {
                    bestImageUrl = ogMatch[1];
                    console.log(`Found og:image: ${bestImageUrl}`);
                } else if (twitterMatch && twitterMatch[1]) {
                    bestImageUrl = twitterMatch[1];
                    console.log(`Found twitter:image: ${bestImageUrl}`);
                }

                if (bestImageUrl) {
                    // Final Clean-up: If it's a relative URL, resolve it (basic)
                    if (!bestImageUrl.startsWith('http')) {
                        const baseUrl = new URL(url).origin;
                        bestImageUrl = new URL(bestImageUrl, baseUrl).href;
                    }
                    targetImageUrl = bestImageUrl;
                }
            } catch (err) {
                console.error(`Failed to fetch webpage: ${err.message}. Using original URL as fallback.`);
            }
        }

        // Upload to Cloudinary (handles both direct URLs and fetched URLs)
        const result = await cloudinary.uploader.upload(targetImageUrl, {
            folder: folder,
            resource_type: 'auto'
        });

        return result.secure_url;
    } catch (error) {
        console.error('Smart fetch failed:', error.message);
        throw new Error('Failed to fetch/upload image from provide link');
    }
};

module.exports = { cloudinary, upload, smartFetchImage };
