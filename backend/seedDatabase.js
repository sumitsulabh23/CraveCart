const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Restaurant = require('./models/Restaurant');
const FoodItem = require('./models/FoodItem');
const User = require('./models/User');

dotenv.config();

// Connect to Database
connectDB();

const seedData = async () => {
    try {
        console.log('Seeding process started...');

        // Clear existing restaurant and food data
        await Restaurant.deleteMany();
        await FoodItem.deleteMany();
        console.log('Cleared existing Restaurants and Foods.');

        // Find an admin user to assign as owner. If none exists, script will throw error to ensure proper setup.
        const adminUser = await User.findOne({ role: { $in: ['admin', 'owner'] } });

        if (!adminUser) {
            console.error('No admin/owner user found! Please create an admin account before seeding.');
            process.exit(1);
        }

        const ownerId = adminUser._id;

        const restaurantsToSeed = [
            {
                name: 'Delhi Spice Hub',
                description: 'Authentic North Indian Cuisine',
                address: 'Connaught Place, New Delhi',
                image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4', // Restaurant image placeholder
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Butter Chicken', price: 349, category: 'Main Course', image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800' },
                    { name: 'Paneer Butter Masala', price: 299, category: 'Main Course', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=800' },
                    { name: 'Dal Makhani', price: 249, category: 'Main Course', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800' },
                    { name: 'Tandoori Roti', price: 25, category: 'Breads', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800' },
                    { name: 'Garlic Naan', price: 45, category: 'Breads', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800' },
                    { name: 'Chicken Biryani', price: 329, category: 'Main Course', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
                    { name: 'Veg Biryani', price: 279, category: 'Main Course', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800' }
                ]
            },
            {
                name: 'Mumbai Street Eats',
                description: 'Famous Mumbai Street Food',
                address: 'Bandra West, Mumbai',
                image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5', // Restaurant image placeholder
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Vada Pav', price: 30, category: 'Snacks', image: 'https://images.unsplash.com/photo-1605493725516-e5c9424e75eb?w=800' },
                    { name: 'Pav Bhaji', price: 120, category: 'Snacks', image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800' },
                    { name: 'Misal Pav', price: 140, category: 'Snacks', image: 'https://images.unsplash.com/photo-1626509653294-f8776caad9eb?w=800' },
                    { name: 'Pani Puri', price: 50, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
                    { name: 'Sev Puri', price: 60, category: 'Snacks', image: 'https://images.unsplash.com/photo-1606491956291-561b36952cc2?w=800' },
                    { name: 'Bombay Sandwich', price: 110, category: 'Snacks', image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800' }
                ]
            },
            {
                name: 'Chennai Dosa Corner',
                description: 'Traditional South Indian Dishes',
                address: 'T Nagar, Chennai',
                image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e', // Restaurant image placeholder
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Plain Dosa', price: 80, category: 'Main Course', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=800' },
                    { name: 'Masala Dosa', price: 120, category: 'Main Course', image: 'https://images.unsplash.com/photo-1610192248512-af6e0dcbd082?w=800' },
                    { name: 'Idli Sambar', price: 70, category: 'Main Course', image: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9b1?w=800' },
                    { name: 'Medu Vada', price: 60, category: 'Snacks', image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800' },
                    { name: 'Uttapam', price: 130, category: 'Main Course', image: 'https://images.unsplash.com/photo-1605493725516-e5c9424e75eb?w=800' },
                    { name: 'Filter Coffee', price: 40, category: 'Beverages', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800' }
                ]
            },
            {
                name: 'Kolkata Royal Kitchen',
                description: 'Authentic Bengali Cuisine',
                address: 'Park Street, Kolkata',
                image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9', // Restaurant image placeholder
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Mutton Kosha', price: 399, category: 'Main Course', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800' },
                    { name: 'Fish Curry', price: 329, category: 'Main Course', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
                    { name: 'Luchi', price: 40, category: 'Breads', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800' },
                    { name: 'Cholar Dal', price: 150, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
                    { name: 'Rasgulla', price: 25, category: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800' },
                    { name: 'Mishti Doi', price: 60, category: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800' }
                ]
            },
            {
                name: 'Jaipur Rajasthani Thali',
                description: 'Traditional Rajasthani Food',
                address: 'MI Road, Jaipur',
                image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0', // Restaurant image placeholder
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Dal Baati Churma', price: 299, category: 'Main Course', image: 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=800' },
                    { name: 'Gatte Ki Sabzi', price: 199, category: 'Main Course', image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc0?w=800' },
                    { name: 'Ker Sangri', price: 220, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
                    { name: 'Bajra Roti', price: 35, category: 'Breads', image: 'https://images.unsplash.com/photo-1596560548464-f010549b84d7?w=800' },
                    { name: 'Rajasthani Thali', price: 399, category: 'Main Course', image: 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800' }
                ]
            },
            {
                name: 'Hyderabad Nawabi Cuisine',
                description: 'Authentic Hyderabadi Biryani and More',
                address: 'Banjara Hills, Hyderabad',
                image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8',
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Hyderabadi Chicken Biryani', price: 350, category: 'Main Course', image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800' },
                    { name: 'Mutton Haleem', price: 400, category: 'Main Course', image: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800' },
                    { name: 'Chicken 65', price: 250, category: 'Starters', image: 'https://images.unsplash.com/photo-1626074263720-c24c75ca1029?w=800' },
                    { name: 'Double Ka Meetha', price: 150, category: 'Desserts', image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800' }
                ]
            },
            {
                name: 'Goan Coastal Retreat',
                description: 'Delicious Goan Seafood and Curries',
                address: 'Vagator Beach Road, Goa',
                image: 'https://images.unsplash.com/photo-1544025162-d76694265947',
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Goan Fish Curry', price: 450, category: 'Main Course', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
                    { name: 'Prawns Balchao', price: 500, category: 'Starters', image: 'https://images.unsplash.com/photo-1559742811-822873691df8?w=800' },
                    { name: 'Chicken Xacuti', price: 380, category: 'Main Course', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=800' },
                    { name: 'Bebinca', price: 200, category: 'Desserts', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800' }
                ]
            },
            {
                name: 'Amritsari Dhaba',
                description: 'Hearty Punjabi Flavors',
                address: 'Golden Temple Road, Amritsar',
                image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a',
                isActive: true,
                owner: ownerId,
                foods: [
                    { name: 'Amritsari Kulcha', price: 120, category: 'Breads', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800' },
                    { name: 'Chole Bhature', price: 180, category: 'Main Course', image: 'https://images.unsplash.com/photo-1626776876729-bab4369a5a5a?w=800' },
                    { name: 'Sarson Ka Saag with Makki Roti', price: 250, category: 'Main Course', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800' },
                    { name: 'Lassi', price: 80, category: 'Beverages', image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800' }
                ]
            }
        ];

        for (const resData of restaurantsToSeed) {
            const { foods, ...restaurantInfo } = resData;

            // Create Restaurant
            const restaurant = new Restaurant(restaurantInfo);
            const savedRestaurant = await restaurant.save();
            console.log(`Created Restaurant: ${savedRestaurant.name}`);

            const foodsToInsert = foods.map(food => ({
                restaurantId: savedRestaurant._id,
                name: food.name,
                price: food.price,
                category: food.category,
                image: food.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c', // Fallback image
                isAvailable: true
            }));

            await FoodItem.insertMany(foodsToInsert);
            console.log(`  -> Added ${foodsToInsert.length} foods.`);
        }

        console.log('Seeding completed successfully!');
        process.exit();
    } catch (error) {
        console.error('Error during seeding:', error);
        process.exit(1);
    }
};

seedData();
