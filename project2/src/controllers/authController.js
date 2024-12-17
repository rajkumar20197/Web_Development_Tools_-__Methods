import { login, logout } from '../models/services.js';
import { setState } from '../models/state.js';
import { showLogin, showChat } from '../views/views.js';


export function handleLogin(username) {                 // Login handler: updates state and shows chat
    return login(username)
        .then(() => {
            setState({ user: username });
            showChat();
        })
        .catch(error => {
            alert(error.message);                       // Show error message
            throw error;
        });
}


export function handleLogout() {                         // Logout handler: resets state and shows login
    return logout()
        .then(() => {
            setState({ user: null });
            showLogin();
        })
        .catch(error => alert(error.message));               // Show error message
}