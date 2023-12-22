const express = require('express');
const axios = require('axios');
const Weather = require('../models/Weather');
const router = express.Router();

require('dotenv').config(); // Load environment variables

router.get('/', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).send("City is required");
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY; // Retrieve API key

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  


    try {
        const response = await axios.get(url);

        // Extract relevant data from the API response
        const { name, main, weather } = response.data;

        // Create a new Weather document using the Weather model
        const newWeather = new Weather({
            city: name,
            temperature: main.temp,
            description: weather[0].description,
        });

        // Save the weather data to the database
        const savedWeather = await newWeather.save();

        res.json(savedWeather);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).send(error.response.data);
        } else {
            res.status(500).send('Error fetching or saving weather data');
        }
    }
});

module.exports = router;
