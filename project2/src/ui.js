import { login, logout, getUsers, getMessages, sendMessage } from './models/services.js';
import { getState, setState } from './models/state.js';


export function showLoading() {                                        // Show loading indicator and hide other elements
    document.getElementById('loading').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('chat').style.display = 'none';
}


export function showLogin() {                                             // Show login form and hide other elements
    document.getElementById('loading').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
    document.getElementById('chat').style.display = 'none';
}


export function showChat() {                                                  // Show chat interface and update chat content
    document.getElementById('loading').style.display = 'none';
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    updateChat();                                                            // Fetch users and messages
}


function updateChat() {                                                           // Update chat by fetching users and messages
    getUsers()
        .then(users => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = users.map(user => `<li>${user}</li>`).join('');
        })
        .catch(error => console.error('Error fetching users:', error));

    getMessages()
        .then(messages => {
            const messageList = document.getElementById('message-list');
            messageList.innerHTML = messages.map(msg => `<li><strong>${msg.username}:</strong> ${msg.text}</li>`).join('');
        })
        .catch(error => console.error('Error fetching messages:', error));
}


export function initEventListeners() {                                                         // Initialize event listeners for user interactions
    document.getElementById('login').addEventListener('submit', handleLogin);
    document.getElementById('send-message').addEventListener('submit', handleSendMessage);
    document.getElementById('logout').addEventListener('click', handleLogout);
    setInterval(updateChat, 5000);                                                            // Poll for updates every 5 seconds
}


function handleLogin(e) {                                                                     // Handle user login form submission
    e.preventDefault();
    const username = document.getElementById('username').value;
    login(username)
        .then(user => {
            setState({ user });
            showChat();
        })
        .catch(error => {
            document.getElementById('login-error').textContent = error.message;
            document.getElementById('login-error').style.display = 'block';                      // Show error message
        });
}


function handleSendMessage(e) {                                                                  // Handle sending a chat message
    e.preventDefault();
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value;
    sendMessage(message)
        .then(() => {
            messageInput.value = ''; 
            updateChat(); 
        })
        .catch(error => console.error('Error sending message:', error));
}


function handleLogout() {                                                                      // Handle user logout action
    logout()
        .then(() => {
            setState({ user: null });
            showLogin();                                                                       // Show login form after logout
        })
        .catch(error => console.error('Error logging out:', error));
}