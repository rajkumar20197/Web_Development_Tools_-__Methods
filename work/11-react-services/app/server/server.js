import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { randomUUID as uuid } from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const sessions = {};
const users = {};

app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.json());

function isValidUsername(username) {
  return /^[A-Za-z0-9_]+$/.test(username) && username !== 'dog';
}

function isValidWord(word) {
  return /^[A-Za-z]*$/.test(word);
}

app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions[sid]?.username : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;
  if (!isValidUsername(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }
  const sid = uuid();
  sessions[sid] = { username };
  users[username] = users[username] || '';
  res.cookie('sid', sid);
  res.json({ username });
});

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  if (sid) {
    delete sessions[sid];
    res.clearCookie('sid');
  }
  res.json({ wasLoggedIn: !!sid });
});

app.get('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions[sid]?.username : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const storedWord = users[username] || '';
  res.json({ storedWord });
});

app.put('/api/word', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions[sid]?.username : '';
  if (!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  
  const { word } = req.body;
  
  if (!isValidWord(word)) {
    res.status(400).json({ error: 'invalid-word' });
    return;
  }
  
  users[username] = word;
  res.json({ storedWord: word });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));