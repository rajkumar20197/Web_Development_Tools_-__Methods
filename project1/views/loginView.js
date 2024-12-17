function renderLoginPage(errorMessage = '') {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Word Guess - Login</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <header>
        <h1>Word Guess</h1>
      </header>
      <main>
        <h2>Login</h2>
        ${errorMessage ? `<p class="error">${errorMessage}</p>` : ''}
        <form action="/login" method="POST">
          <input type="text" name="username" placeholder="Enter your username" required>
          <button type="submit">Login</button>
        </form>
      </main>
      <footer>
      <p>t&c privacy policy</p>
      </footer>
    </body>
    </html>
  `;
}

module.exports = { renderLoginPage };
