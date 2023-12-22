import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');

    // Function to fetch real-time weather data
    const fetchWeatherData = async () => {
        setError('');
        try {
            const response = await axios.get(`/api/weather?city=${city}`);
            setWeatherData(response.data);
        } catch (err) {
            console.error('Server Error:', err);
            setError('Error fetching real-time weather data.');
        }
    };

    return (
        <div className="weather-container">
            <h2>Weather Forecast</h2>
            <div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city name"
                />
                <button onClick={fetchWeatherData}>Search</button>
            </div>
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-data">
                    <h3>{weatherData.city}</h3>
                    <p>Temperature: {weatherData.temperature}°C</p>
                    <p>Condition: {weatherData.description}</p>
                </div>
            )}
        </div>
    );
}

export default Weather;
