import React from 'react';
import '../styles/Header.css';
import movieIcon from '../assets/movie-icon.svg';

function Header({ username, onLogout }) {
  return (
    <header className="header">
      <div className="header-left">
        <img src={movieIcon} alt="Movie Collection Logo" className="header-logo" />
      </div>
      
      <div className="header-center">
        <h1 className="header-title">Movie Collection</h1>
      </div>
      
      {username && (
        <div className="user-controls">
          <span>Welcome, {username}!</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      )}
    </header>
  );
}

export default Header;