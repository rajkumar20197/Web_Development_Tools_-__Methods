import React, { useState, useEffect } from 'react';
import Login from './Login';
import Logout from './Logout';
import WordDisplay from './WordDisplay';
import LoadingIndicator from './LoadingIndicator';
import Header from './Header';
import Footer from './Footer';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkForSession();
  }, []);

  const checkForSession = () => {
    setLoading(true);
    fetch('/api/session')
      .then(res => res.ok ? res.json() : Promise.reject(res))
      .then(data => setUsername(data.username))
      .catch(() => setUsername(''))
      .finally(() => setLoading(false));
  }
  
  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <div className="app">
      <Header />
      {username ? (
        <>
          <p>Welcome, {username}!</p>
          <WordDisplay username={username} />
          <Logout setUsername={setUsername} />
        </>
      ) : (
        <Login setUsername={setUsername} />
      )}
      <Footer />
    </div>
  );
}

export default App;