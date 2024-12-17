import React, { useState } from 'react';
import { fetchLogin } from '../services/api';

function Login({ setUsername }) {
  const [inputUsername, setInputUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const data = await fetchLogin(inputUsername);
      setUsername(data.username);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default Login;