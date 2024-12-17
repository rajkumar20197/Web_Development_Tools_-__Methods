import React, { useState } from 'react';
import { compareWords } from '../utils/wordUtils';
import { SECRET_WORD } from "@/config/gameConfig";
import PropTypes from 'prop-types';

function Game({ user, onLogout }) {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^[a-zA-Z]{5}$/.test(guess)) {
      setMessage(`${guess} was not a valid word`);
      setGuess('');
      return;
    }
    
    if (guess.toUpperCase() === SECRET_WORD) {
      setMessage(`${guess} is the secret word!`);
    } else {
      const commonLetters = compareWords(guess.toUpperCase(), SECRET_WORD);
      setMessage(`${guess} had ${commonLetters} letters in common`);
    }
    setGuess('');
  };

  return (
    <div className="game">
      <h2>Welcome, <span className="username">{user}</span>!</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Enter a 5-letter word"
        />
        <button type="submit">Guess</button>
      </form>
      {message && <p className="game-message">{message}</p>}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}

Game.propTypes = {
  user: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Game;