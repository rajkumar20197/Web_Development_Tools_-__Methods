import { getUsers, getMessages, sendMessage } from '../models/services.js';
import { renderUsers, renderMessages } from '../views/views.js';


export function updateChat() {                          // Updates chat by fetching and rendering users and messages
    getUsers()
        .then(users => renderUsers(users)) 
        .catch(error => console.error(error));

    getMessages()
        .then(messages => renderMessages(messages)) 
        .catch(error => console.error(error));
}


export function handleSendMessage(text) {               // Handles sending a message and updates the chat afterward
    return sendMessage(text)
        .then(() => updateChat()) 
        .catch(error => alert(error.message)); 
}