// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar({ isLoggedIn, handleLogout }) {
  return (
    <nav className={`navbar${isLoggedIn ? ' logged-in' : ''}`}>
      <ul>
        <li>
          <Link to="/weather">Weather</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/custom-weather">Custom Weather</Link>
          </li>
        )}
       {isLoggedIn && (
          <li>
            <Link to="/account-settings">Account Settings</Link>
          </li>
        )} 
        {isLoggedIn && (
          <li>
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavigationBar;
