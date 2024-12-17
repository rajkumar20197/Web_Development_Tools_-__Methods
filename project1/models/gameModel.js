const path = require('path');
const words = require('../words');

class GameModel {
  constructor() {
    this.games = {};
    this.words = words;
  }

  startNewGame(username) {
    const secretWord = this.words[Math.floor(Math.random() * this.words.length)];
    this.games[username] = {
      secretWord,
      guesses: [],
      attempts: 0,
      lastGuess: '',
      lastGuessResult: '',
      matchedLetters: 0
    };
    return this.games[username];
  }

  getGameState(username) {
    return this.games[username];
  }

  makeGuess(username, guess) {
    const game = this.games[username];
    if (!game) {
      throw new Error('No active game for this user');
    }

    game.attempts++;
    game.lastGuess = guess;
    const lowerGuess = guess.toLowerCase();

    if (lowerGuess === game.secretWord.toLowerCase()) {
      game.lastGuessResult = 'correct';
      game.matchedLetters = game.secretWord.length;
    } else if (!this.words.includes(lowerGuess)) {
      game.lastGuessResult = 'invalid';
      game.matchedLetters = 0;
    } else if (game.guesses.some(g => g.toLowerCase() === lowerGuess)) {
      game.lastGuessResult = 'duplicate';
      game.matchedLetters = 0;
    } else {
      game.lastGuessResult = 'incorrect';
      game.matchedLetters = this.countMatchingLetters(lowerGuess, game.secretWord);
    }

    if (game.lastGuessResult !== 'duplicate' && game.lastGuessResult !== 'invalid') {
      game.guesses.push(lowerGuess);
    }

    return game;
  }

  countMatchingLetters(word1, word2) {
    const letters1 = word1.split('');
    const letters2 = word2.toLowerCase().split('');
    let count = 0;
    for (let letter of letters1) {
      const index = letters2.indexOf(letter);
      if (index !== -1) {
        count++;
        letters2.splice(index, 1);
      }
    }
    return count;
  }
}

module.exports = new GameModel();
