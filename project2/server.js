const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());

const sessions = {}; 
const users = {};    
const messages = {}; 
let messageId = 0;   


function generateSid() {                                          // Generate a random session ID
    return Math.random().toString(36).substring(2, 15);
}


function isValidUsername(username) {                             // Validate username format
    return /^[a-zA-Z0-9_-]{3,20}$/.test(username);
}


app.get('/api/v1/session', (req, res) => {                           // Check session status
    const sid = req.cookies.sid;
    if (sid && sessions[sid]) {
        res.json({ username: sessions[sid] });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});


app.post('/api/v1/session', (req, res) => {                             // Create a new session for the user
    const { username } = req.body;

    if (!isValidUsername(username)) {
        res.status(400).json({ error: 'Invalid username' });
        return;
    }

    if (username.toLowerCase() === 'dog') {
        res.status(403).json({ error: 'Username not allowed' });
        return;
    }

    const sid = generateSid();
    sessions[sid] = username;

    if (!users[username]) {
        users[username] = new Set();
    }
    users[username].add(sid);

    res.cookie('sid', sid, { httpOnly: true });                            // Set session cookie
    res.json({ username });
});


app.delete('/api/v1/session', (req, res) => {                               // Logout and clear session
    const sid = req.cookies.sid;
    const username = sessions[sid];
    if (username) {
        delete sessions[sid];
        users[username].delete(sid);
        if (users[username].size === 0) {
            delete users[username];
        }
        res.clearCookie('sid');                                             // Clear the session cookie
        res.json({ message: 'Logged out' });
    } else {
        res.status(401).json({ error: 'Not logged in' });
    }
});


app.get('/api/v1/users', (req, res) => {                                  // Get list of online users
    const sid = req.cookies.sid;
    if (!sessions[sid]) {
        res.status(401).json({ error: 'Not logged in' });
        return;
    }
    res.json(Object.keys(users)); 
});


app.get('/api/v1/messages', (req, res) => {                                 // Get recent chat messages
    const sid = req.cookies.sid;
    if (!sessions[sid]) {
        res.status(401).json({ error: 'Not logged in' });
        return;
    }
    const messageArray = Object.values(messages);
    res.json(messageArray.slice(-100));                                      // Return the last 100 messages
});


app.post('/api/v1/messages', (req, res) => {                                   // Post a new chat message
    const sid = req.cookies.sid;
    const username = sessions[sid];
    const { text } = req.body;

    if (!username) {
        res.status(401).json({ error: 'Not logged in' });
        return;
    }

    if (!text || typeof text !== 'string' || text.trim().length === 0) {
        res.status(400).json({ error: 'Invalid message' });
        return;
    }
    
    if (text.length > 500) {
        res.status(400).json({ error: 'Message too long' });
        return;
    }

    const message = { id: messageId++, username, text: text.trim(), timestamp: Date.now() };
    messages[message.id] = message;                                                                // Store the message
    res.json(message);
});


app.listen(PORT, () => {                                                                    // Start the server on the specified port
    console.log(`Server running on http://localhost:${PORT}`);
});