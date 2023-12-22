
import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
import Weather from './components/Weather';
import CustomWeather from './components/CustomWeather'; // Import CustomWeather
import Login from './components/Login';
import Register from './components/Register';
// import AccountSettings from './components/AccountSettings';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [isRegistered, setIsRegistered] = useState(false);



    const handleLogin = () => {
        setIsLoggedIn(true);
        console.log('User is now logged in.');
    };

    const handleRegister = () => {
        setIsLoggedIn(true);
        setIsRegistered(true);
        console.log('User is now registered');
    };

    // const handleLogout = async () => {
    //     try {
    //         await axios.post('/api/logout');
    //         setIsLoggedIn(false);
    //         setUser(null);
    //     } catch (error) {
    //         console.error('Error logging out:', error);
    //     }
    // };

    return (
        <Router>
            <div className={`App${isLoggedIn ? ' logged-in' : ''}`}>
                <nav className="navbar">
                    <ul className="nav-menu">
                        {isLoggedIn && (
                            <>
                                <li className="nav-item">
                                    <Link to="/weather" className="nav-link">Weather</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/custom-weather" className="nav-link">Custom Weather</Link> {/* Add this */}
                                </li>
                                {/* <li className="nav-item">
                                    <Link to="/account-settings" className="nav-link">Account Settings</Link>
                                </li> */}
                                {/* <li className="nav-item">
                                    <button className="logout-button" onClick={handleLogout}>Logout</button>
                                </li> */}
                            </>
                        )}
                    </ul>
                </nav>

                <Routes>
                <Route
            path="/"
            element={
              <div className="home-page">
                <header>
                  <h1 className="app-title">Welcome to Conor's Weather App</h1>
                </header>
                {!isLoggedIn ? (
                  <section className="login-register-section">
                    <div className="buttons-container">
                      <Link to="/login" className="button-style">
                        Login
                      </Link>
                      <Link to="/register" className="button-style">
                        Register
                      </Link>
                    </div>
                    {isRegistered && <p>User successfully registered</p>}
                  </section>
                ) : (
                  <section className="logged-in-section">
                    <Navigate replace to="/weather" />
                  </section>
                )}
              </div>
            }
          />
                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                    <Route path="/register" element={<Register onRegister={handleRegister} />} />
                    {isLoggedIn && (
                        <>
                            <Route path="/weather" element={<Weather />} />
                            <Route path="/custom-weather" element={<CustomWeather />} /> 
                            {/* <Route path="/account-settings" element={<AccountSettings user={user} />} /> */}
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
