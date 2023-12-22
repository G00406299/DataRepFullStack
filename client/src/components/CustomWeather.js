import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CustomWeather() {
    const [customWeatherData, setCustomWeatherData] = useState([]);
    const [newWeather, setNewWeather] = useState({ city: '', temperature: '', weatherCondition: '' });
    const [editableData, setEditableData] = useState({ city: '', temperature: '', weatherCondition: '' });
    const [editId, setEditId] = useState(null);
    const [error, setError] = useState('');

    // Function to fetch custom weather data
    const fetchCustomWeatherData = async () => {
        try {
            const response = await axios.get('/api/customWeather');
            setCustomWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching custom weather data:', error);
            setError('Error fetching custom weather data.');
        }
    };

    // Fetch custom weather data on component mount
    useEffect(() => {
        fetchCustomWeatherData();
    }, []);

    // Function to add new custom weather data
    const handleAddNewWeather = async () => {
        try {
            await axios.post('/api/customWeather', newWeather);
            setNewWeather({ city: '', temperature: '', weatherCondition: '' });
            fetchCustomWeatherData();
        } catch (error) {
            console.error('Error adding custom weather data:', error);
            setError('Error adding custom weather data.');
        }
    };

    // Function to handle edit
    const handleEdit = (weather) => {
        setEditId(weather._id);
        setEditableData({ city: weather.city, temperature: weather.temperature, weatherCondition: weather.weatherCondition });
    };

    // Function to handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/customWeather/${id}`);
            fetchCustomWeatherData();
        } catch (error) {
            console.error('Error deleting weather data:', error);
            setError('Error deleting weather data.');
        }
    };

    // Function to submit edited data
    const submitEdit = async () => {
        try {
            await axios.put(`/api/customWeather/${editId}`, editableData);
            setEditId(null);
            setEditableData({ city: '', temperature: '', weatherCondition: '' }); // Clear the editable data
            fetchCustomWeatherData();
        } catch (error) {
            console.error('Error updating weather data:', error);
            setError('Error updating weather data.');
        }
    };

    return (
        <div className="weather-container">
            <h2>Custom Weather Data</h2>
            {error && <p className="error">{error}</p>}

            <div>
                <h3>Add New Weather Data</h3>
                <input type="text" placeholder="City" value={newWeather.city} onChange={(e) => setNewWeather({ ...newWeather, city: e.target.value })} />
                <input type="number" placeholder="Temperature" value={newWeather.temperature} onChange={(e) => setNewWeather({ ...newWeather, temperature: e.target.value })} />
                <input type="text" placeholder="Weather Condition" value={newWeather.weatherCondition} onChange={(e) => setNewWeather({ ...newWeather, weatherCondition: e.target.value })} />
                <button onClick={handleAddNewWeather}>Add Weather</button>
            </div>

            {editId && (
                <div>
                    <h3>Edit Weather Data</h3>
                    <input
                        type="text"
                        placeholder="City"
                        value={editableData.city}
                        onChange={(e) => setEditableData({ ...editableData, city: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Temperature"
                        value={editableData.temperature}
                        onChange={(e) => setEditableData({ ...editableData, temperature: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Weather Condition"
                        value={editableData.weatherCondition}
                        onChange={(e) => setEditableData({ ...editableData, weatherCondition: e.target.value })}
                    />
                    <button onClick={submitEdit}>Submit Edit</button>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>City</th>
                        <th>Temperature</th>
                        <th>Weather Condition</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customWeatherData.map((weather) => (
                        <tr key={weather._id}>
                            <td>{weather.city}</td>
                            <td>{weather.temperature}°C</td>
                            <td>{weather.weatherCondition}</td>
                            <td>
                                <button onClick={() => handleEdit(weather)}>Edit</button>
                                <button onClick={() => handleDelete(weather._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CustomWeather;
