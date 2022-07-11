// BEWARE DELETES DATABASE



const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62bc2e55f90b88e5539b04d5',
            title: `${sample(descriptors)} ${sample(places)}`,
            location: `${cities[random1000].city}, ${cities[random1000].state},`,
            description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque veritatis provident quod eius voluptatum amet perspiciatis fugit impedit ab quae, suscipit iure ad culpa vel ut aliquam optio, ipsa nam.',
            price,
            geometry: {
                'type': 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/codinghammy/image/upload/v1657210458/YelpCamp/emhuyzozqlvd2y5r0msq.jpg',
                    filename: 'YelpCamp/emhuyzozqlvd2y5r0msq'
                },
                {
                    url: 'https://res.cloudinary.com/codinghammy/image/upload/v1657210457/YelpCamp/grylzb0wikayxxxoqzqv.jpg',
                    filename: 'YelpCamp/grylzb0wikayxxxoqzqv'
                },
                {
                    url: 'https://res.cloudinary.com/codinghammy/image/upload/v1657210459/YelpCamp/s8wa7zmqqguf0yjvmggu.jpg',
                    filename: 'YelpCamp/s8wa7zmqqguf0yjvmggu'
                }
            ]
        })
        await camp.save();
    }
};
seedDB().then(() => {
    mongoose.connection.close()
});