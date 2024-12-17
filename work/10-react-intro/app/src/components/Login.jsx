import React, { useState } from 'react';
import { INVALID_USERNAME_ERROR, EMPTY_USERNAME_ERROR } from "../constants/errorMessages";

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const allowlistedUsers = ['user1', 'user2', 'user3', 'Username', 'username', 'xujia', 'brettritter']; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'dog') {
      setError(INVALID_USERNAME_ERROR);
    } else if (username.length > 20) {
      setError('Username cannot be more than 20 characters');
    } else if (!allowlistedUsers.includes(username)) {
      setError('Username not allowed');
    } else if (username.trim()) {
      if (/^[a-zA-Z1-9]+$/.test(username)) {
        onLogin(username);
      } else {
        setError('Username contains invalid characters');
      }
    } else {
      setError(EMPTY_USERNAME_ERROR);
    }
  };

  return (
    <div className="login">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          maxLength="20"
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default Login;