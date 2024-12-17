const words = require('../words');
function renderGamePage(username, gameState, stats) {
  const wordList = words.map(word => `<span class="word">${word}</span>`).join(' ');

  const guessList = gameState.guesses.map(guess => 
    `<li>${guess} - Matches: ${gameState.matchedLetters}</li>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Word Guess - Game</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>Word Guess</h1>
        <p>Welcome, ${username}!</p>
      </header>
      <main>
        <section id="game-info">
          <h2>Game Information</h2>
          <p>Guesses made: ${gameState.attempts}</p>
          ${gameState.lastGuess ? `
            <p class="${gameState.lastGuessResult}">
              Last guess: ${gameState.lastGuess} - 
                ${gameState.lastGuessResult === 'invalid' ? 'Invalid guess' :
                  gameState.lastGuessResult === 'duplicate' ? 'Already guessed' :
                  gameState.lastGuessResult === 'correct' ? 'Correct! You won!' :
                  `Incorrect (${gameState.matchedLetters} matching letters)`}
            </p>

          ` : ''}
        </section>

        ${gameState.lastGuessResult !== 'correct' ? `
          <section id="guess-form">
            <h2>Make a Guess</h2>
            <form action="/guess" method="POST">
              <input type="text" name="guess" placeholder="Enter your guess" required>
              <button type="submit">Guess</button>
            </form>
          </section>
        ` : ''}

        <section id="word-list">
          <h2>Available Words</h2>
          <div class="word-list">${wordList}</div>
        </section>

        <section id="guesses">
          <h2>Your Guesses</h2>
          <ul>${guessList}</ul>
        </section>

        <section id="stats">
          <h2>Statistics</h2>
          <p>Games Played: ${stats.gamesPlayed}</p>
          <p>Games Won: ${stats.gamesWon}</p>
          <p>Best Score: ${stats.bestScore === Infinity ? 'N/A' : stats.bestScore}</p>
        </section>

        <section id="game-controls">
          <form action="/new-game" method="POST">
            <button type="submit">Start New Game</button>
          </form>
          <form action="/logout" method="POST">
            <button type="submit">Logout</button>
          </form>
        </section>
      </main>
      <footer>
        <p>t&c privacy policy</p>
      </footer>
    </body>
    </html>
  `;
}

module.exports = { renderGamePage };
