const express = require('express');
const router = express.Router();
const CustomWeather = require('../models/CustomWeather'); // Import your CustomWeather model

// POST request to add custom weather data
router.post('/', async (req, res) => {
  try {
    const { city, temperature, weatherCondition } = req.body;

    const customWeather = new CustomWeather({
      city,
      temperature,
      weatherCondition,
    });

    await customWeather.save();

    res.status(201).json({ message: 'Custom weather data added successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET request to retrieve custom weather data
router.get('/', async (req, res) => {
  try {
    const customWeatherData = await CustomWeather.find();
    res.json(customWeatherData);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT request to update custom weather data by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from route parameters
    const { city, temperature, weatherCondition } = req.body;

    // Find the specific custom weather data by ID and update it
    const updatedWeather = await CustomWeather.findByIdAndUpdate(
      id,
      {
        city,
        temperature,
        weatherCondition,
      },
      { new: true } // Return the updated document
    );

    if (!updatedWeather) {
      // If the resource with the provided ID is not found, return a 404 response
      return res.status(404).json({ error: 'Custom weather data not found.' });
    }

    res.json({ message: 'Custom weather data updated successfully.', updatedWeather });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE request to delete custom weather data by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Extract the ID from route parameters

    // Find the specific custom weather data by ID and delete it using findByIdAndDelete
    const deletedWeather = await CustomWeather.findByIdAndDelete(id);

    if (!deletedWeather) {
      // If the resource with the provided ID is not found, return a 404 response
      return res.status(404).json({ error: 'Custom weather data not found.' });
    }

    res.json({ message: 'Custom weather data deleted successfully.' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
  

//empty