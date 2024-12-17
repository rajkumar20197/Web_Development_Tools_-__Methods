const appState = {
  userName: '',
  savedWord: '',
  errorMessage: '',
};


const API_ENDPOINTS = {           // Constants for API endpoints
  SESSION: '/api/session',
  WORD: '/api/word',
};

document.addEventListener('DOMContentLoaded', () => {
  validateSession();
  const appElement = document.getElementById('app');
  
  
  appElement.addEventListener('click', handleClick);      // Attach event listener for delegation
  appElement.addEventListener('submit', handleSubmit);
});


function validateSession() {                              // Validate user session on page load
  fetch(API_ENDPOINTS.SESSION)
    .then(response => {
      if (!response.ok) throw new Error('auth-missing');
      return response.json();
    })
    .then(data => {
      appState.userName = data.username;
      fetchStoredWord();
    })
    .catch(() => displayLogin());
}


function performLogin(user) {                           // Handle user login
  fetch(API_ENDPOINTS.SESSION, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: user }),
  })
    .then(response => {
      if (!response.ok) {
        appState.errorMessage = (user === 'dog') ? 'Incorrect. Try again.' : 'Invalid username format.';
        throw new Error('login-failed');
      }
      return response.json();
    })
    .then(data => {
      appState.userName = data.username;
      appState.errorMessage = '';
      fetchStoredWord();
    })
    .catch(() => displayLogin());
}


function performLogout() {                              // Logout user and clear session
  fetch(API_ENDPOINTS.SESSION, { method: 'DELETE' })
    .then(() => {
      appState.userName = '';
      displayLogin();
    });
}


function fetchStoredWord() {                            // Fetch stored word for the logged-in user
  fetch(API_ENDPOINTS.WORD)
    .then(response => response.json())
    .then(data => {
      appState.savedWord = data.storedWord || "No word stored yet.";
      displayWordView();
    })
    .catch(err => console.error('Error fetching stored word:', err));
}


function changeStoredWord(newWord) {                  // Change the stored word
  fetch(API_ENDPOINTS.WORD, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word: newWord }),
  })
    .then(response => {
      if (!response.ok) throw new Error('Failed to update word');
      return response.json();
    })
    .then(data => {
      appState.savedWord = data.storedWord;
      displayWordView();
    })
    .catch(err => console.error('Error changing stored word:', err));
}


function display() {                                  // Display the main app content based on the user state
  const appElement = document.getElementById('app');
  appElement.innerHTML = '';

  if (appState.userName) {
    displayWordView();
  } else {
    displayLogin();
  }
}


function displayLogin() {                             // Display the login form
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    <form id="login-form" class="login-form">
      <label for="username">Username:</label>
      <input type="text" id="username" required>
      <button type="submit">Login</button>
      <div class="error">${appState.errorMessage}</div>
    </form>`;
}


function displayWordView() {                          // Display the word view for logged-in users
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    <div class="word-view">
      <p>Hello, ${appState.userName}</p>
      <p>Stored word: ${appState.savedWord}</p>
      <form id="word-form" class="word-form">
        <label for="word">New Word:</label>
        <input type="text" id="word" required>
        <button type="submit">Update Word</button>
      </form>
      <button class="logout-button">Logout</button>
    </div>
  `;
}


function handleSubmit(event) {                              // Handle submit events
  event.preventDefault();

  if (event.target.classList.contains('login-form')) {
    const user = document.getElementById('username').value;
    performLogin(user);
  } else if (event.target.classList.contains('word-form')) {
    const newWord = document.getElementById('word').value;
    changeStoredWord(newWord);
  }
}


function handleClick(event) {                               // Handle click events
  if (event.target.classList.contains('logout-button')) {
    performLogout();
  }
}
