import { useState } from 'react';
import '../styles/login.css';
import personIcon from '../assets/person.svg';
import movieIcon from '../assets/movie.svg';
import infoIcon from '../assets/info.svg';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!username.trim()) {
        throw new Error('Username is required');
      }

      await onLogin(username);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.error === 'auth-insufficient' 
        ? 'Insufficient permissions' 
        : 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className="login-guide">
          <h2>Welcome to Movie Collection</h2>
          <p className="guide-intro">Your personal movie tracking app</p>
          
          <div className="guide-section">
            <h3>How to Login:</h3>
            <ul>
              <li>
                <img src={personIcon} alt="" className="guide-icon" />
                <span>Enter any username (except "dog")</span>
              </li>
              <li>
                <img src={movieIcon} alt="" className="guide-icon" />
                <span>Start adding your favorite movies</span>
              </li>
            </ul>
          </div>

          <div className="guide-note">
            <img src={infoIcon} alt="" className="guide-icon" />
            <div>
              <strong>Note:</strong>
              <ul>
                <li>Username must contain only letters, numbers, or underscores</li>
                <li>No password is required</li>
                <li>Your collection will be saved for your next visit</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="login-form-container">
          <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username (e.g., movie_fan123)"
                disabled={isLoading}
                required
              />
            </div>
            
            {error && (
              <div className="error-message" role="alert">
                <img src={infoIcon} alt="" className="error-icon" />
                {error}
              </div>
            )}
            
            <button type="submit" disabled={isLoading} className="login-button">
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;