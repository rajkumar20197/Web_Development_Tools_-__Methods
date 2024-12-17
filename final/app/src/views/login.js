export function generateLoginPage(error = '') {
    return `
      <div class="login-container">
        <h2>Login</h2>
        ${error ? `<div class="error">${error}</div>` : ''}
        <form class="login-form">
          <input type="text" name="username" placeholder="Username" required>
          <button type="submit">Login</button>
        </form>
      </div>
    `;
  }