function generateDataPage(username, storedWord) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>User Data</title>
        <link rel="stylesheet" href="/styles.css">
      </head>
      <body>
        <h1>Welcome, ${username}!</h1>
        <p>Your stored word: ${storedWord}</p>
        <form action="/update-word" method="POST">
          <label for="newWord">New word:</label>
          <input type="text" id="newWord" name="newWord" value="${storedWord}">
          <button type="submit">Update Word</button>
        </form>
        <form action="/logout" method="POST">
          <button type="submit">Logout</button>
        </form>
      </body>
      </html>
    `;
  }
  
  module.exports = {
    generateDataPage,
  };