
import React, { useState } from 'react';
import Login from './components/Login';
import Game from './components/Game';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [user, setUser] = useState('');

  const handleLogin = (username) => {
    setUser(username);
  };

  const handleLogout = () => {
    setUser('');
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {user ? (
          <Game user={user} onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;