import { login, logout, getUsers, getMessages, sendMessage } from '../models/services.js';
import { getState, setState } from '../models/state.js';

let pollingInterval = null;                                // Interval for polling chat updates


function startPolling() {                                  // Start polling for chat updates every 5 seconds
    pollingInterval = setInterval(updateChat, 5000);
}


function stopPolling() {                                    // Stop polling for chat updates
    if (pollingInterval) {
        clearInterval(pollingInterval);
        pollingInterval = null;
    }
}


export function showLoading(message = 'Loading...') {                  // Show loading indicator with an optional message
    const loadingElement = document.getElementById('loading');
    loadingElement.textContent = message;
    loadingElement.classList.remove('hidden');
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('chat').classList.add('hidden');
}


export function hideLoading() {                                     // Hide the loading indicator
    document.getElementById('loading').classList.add('hidden');
}


export function showLogin() {                                           // Show login form and hide other elements
    hideLoading();                                            
    document.getElementById('login-form').classList.remove('hidden');
    document.getElementById('chat').classList.add('hidden');
}


export function showLoginWithError(message) {                           // Show login form with an error message
    showLogin();
    const errorElement = document.getElementById('login-error');
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
}


export function showChat() {                                              // Show chat interface and start polling for updates
    hideLoading();
    document.getElementById('login-form').classList.add('hidden');
    document.getElementById('chat').classList.remove('hidden');
    updateChat();
    startPolling();
}


function updateChat() {                                                   // Update chat by fetching users and messages
    Promise.all([
        getUsers().catch(error => {
            console.error('Error fetching users:', error);
            return [];
        }),
        getMessages().catch(error => {
            console.error('Error fetching messages:', error);
            return [];
        })
    ]).then(([users, messages]) => {
        renderUsers(users);
        renderMessages(messages);
    }).catch(error => {
        console.error('Error updating chat:', error);
    });
}


export function renderUsers(users) {                                        // Render the list of online users
    const userList = document.getElementById('user-list');
    userList.innerHTML = users.map(user => `<li>${user}</li>`).join('');
}


export function renderMessages(messages) {                                     // Render the list of chat messages
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = messages.map(msg => `<li><strong>${msg.username}:</strong> ${msg.text}</li>`).join('');
    
    
    const messageContainer = document.getElementById('message-container');
    messageContainer.scrollTop = messageContainer.scrollHeight;
}


function handleLogin(e) {                                                 // Handle user login form submission
    e.preventDefault();
    const username = document.getElementById('username').value;

    showLoading('Logging in...');

    login(username)
        .then(user => {
            setState({ user });
            showChat();
        })
        .catch(error => {
            showLoginWithError(error.message);
        });
}


function handleSendMessage(e) {                                              // Handle sending a chat message
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


function handleLogout() {                                                   // Handle user logout action
    logout()
        .then(() => {
            stopPolling();
            setState({ user: null });
            showLogin();
        })
        .catch(error => console.error('Error logging out:', error));
}


export function initEventListeners() {              // Initialize event listeners for login, send message, and logout actions
    document.getElementById('login').addEventListener('submit', handleLogin);
    document.getElementById('send-message').addEventListener('submit', handleSendMessage);
    document.getElementById('logout').addEventListener('click', handleLogout);
}