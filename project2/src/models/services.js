const API_BASE = '/api/v1'; 


function handleResponse(response) {                         // Handle API responses and check for errors
    if (response.ok) return response.json();
    return response.json().then(err => {
        if (response.status === 401 && err.error === 'Not logged in') {
            return null; 
        }
        throw err; 
    });
}

// Check user session status
export function checkSession() {                                                    // Check user session status
    return fetch(`${API_BASE}/session`, { method: 'GET', credentials: 'include' })
        .then(handleResponse)
        .catch(() => null); 
}


export function login(username) {                                                  // User login function
    if (username.length > 20) {
        return Promise.reject({ message: 'Username must be 20 characters or less' });
    }
    return fetch(`${API_BASE}/session`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
    }).then(handleResponse);
}


export function logout() {                                                               // User logout function
    return fetch(`${API_BASE}/session`, { method: 'DELETE', credentials: 'include' })
        .then(handleResponse);
}


export function getUsers() {                                                         // Fetch online users
    return fetch(`${API_BASE}/users`, { method: 'GET', credentials: 'include' })
        .then(handleResponse);
}


export function getMessages() {                                                      // Fetch chat messages
    return fetch(`${API_BASE}/messages`, { method: 'GET', credentials: 'include' })
        .then(handleResponse);
}


export function sendMessage(text) {                                                     // Send a chat message
    return fetch(`${API_BASE}/messages`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    }).then(handleResponse);
}