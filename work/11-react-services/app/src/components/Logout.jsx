import React from 'react';
import { fetchLogout } from '../services/api';

function Logout({ setUsername }) {
  const handleLogout = async () => {
    try {
      await fetchLogout();
      setUsername('');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
}

export default Logout;