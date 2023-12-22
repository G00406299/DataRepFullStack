const mongoose = require('mongoose');

const customWeatherSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  temperature: {
    type: Number,
    required: true,
  },
  weatherCondition: {
    type: String,
    required: true,
  },
});

const CustomWeather = mongoose.model('CustomWeather', customWeatherSchema);

module.exports = CustomWeather;
