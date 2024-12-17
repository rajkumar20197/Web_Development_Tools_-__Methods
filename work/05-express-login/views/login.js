function generateLoginPage(errorMessage = '') {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Login</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Login</h1>
        ${errorMessage ? `<p class="error">${errorMessage}</p>` : ''}
        <form action="/login" method="POST">
          <label for="username">Username:</label>
          <input type="text" id="username" name="username" required>
          <button type="submit">Login</button>
        </form>
      </body>
      </html>
    `;
  }
  
  function generateErrorPage(errorMessage, returnUrl) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Error</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Error</h1>
        <p class="error">${errorMessage}</p>
        <a href="${returnUrl}">Try again</a>
      </body>
      </html>
    `;
  }
  
  module.exports = {
    generateLoginPage,
    generateErrorPage,
  };