  import React, { useState } from 'react';
  import { useNavigate, Link } from 'react-router-dom';
  import axios from 'axios'; // Import axios

  function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        // Use axios.post for sending a POST request
        const response = await axios.post('http://localhost:5000/api/login', {
          email, 
          password
        });

        if (response.status === 200) {
          // Authentication successful, set isLoggedIn to true
          onLogin();

          // Redirect to the weather page
          navigate('/weather');
        } else {
          // Handle error returned from the server
          setError(response.data.error);
        }
      } catch (err) {
        // Handle any errors that occur during the request
        console.error('Error:', err);
        setError('Server error');
      }
    };

    return (
      <div className="weather-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="button-style">Login</button>
        </form>
        <p>Don't have an account? <Link to="/register">Register here</Link></p>
      </div>
    );
  }

  export default Login;
