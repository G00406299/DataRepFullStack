// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const customWeatherRoutes = require('./routes/customWeatherRoutes');
require('dotenv').config(); // Include dotenv configuration

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
const mongoURI = process.env.MONGODB_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1); // Terminate the app on connection error
  });

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/customWeather', customWeatherRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.get('/', (req, res) => {
  res.send('Weather Forecast Application Backend');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
