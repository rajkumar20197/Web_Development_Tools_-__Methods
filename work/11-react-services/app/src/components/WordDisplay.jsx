import React, { useState, useEffect } from 'react';
import { fetchStoredWord, updateStoredWord } from '../services/api';

function WordDisplay({ username }) {
  const [word, setWord] = useState('');
  const [newWord, setNewWord] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadStoredWord = async () => {
      try {
        const data = await fetchStoredWord();
        setWord(data.storedWord);
      } catch (err) {
        setError(err.message);
      }
    };

    loadStoredWord();
  }, [username]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const data = await updateStoredWord(newWord);
      setWord(data.storedWord);
      setNewWord('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="word-display">
      <p>Your stored word: {word}</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-word">New word:</label>
        <input
          id="new-word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          required
        />
        <button type="submit">Update Word</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default WordDisplay;