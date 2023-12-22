import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Register({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setIsRegistered(true);
        setUsername('');
        setEmail('');
        setPassword('');
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Server error');
    }
  };

  return (
    <div className="weather-container">
      <h2>Register</h2>
      {isRegistered ? (
        <>
          <p className="success">User registered successfully!</p>
          <Link to="/login" className="button-style">
            Login
          </Link>
        </>
      ) : (
        <>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
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
            <button type="submit" className="button-style">
              Register
            </button>
          </form>
          <p>
            Have an account already? <Link to="/login">Login here</Link>
          </p>
        </>
      )}
    </div>
  );
}

export default Register;