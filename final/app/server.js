import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import validateMovie from './src/validators/movieValidator.js';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

const sessions = {};
const movies = {};

app.use(cookieParser());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use((req, res, next) => {
  res.set({
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': "default-src 'self'"
  });
  next();
});

const requireAuth = (req, res, next) => {
  const sid = req.cookies.sid;
  const username = sessions[sid];
  
  if (!username) {
    console.log("auth-missing");
    return res.status(401).json({ error: 'auth-missing' });
  }
  console.log("auth-present");
  req.username = username;
  next();
};

const validateMovieMiddleware = (req, res, next) => {
  const errors = validateMovie(req.body);
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'validation-failed',
      details: errors
    });
  }
  next();
};

app.post('/api/session', express.json(), (req, res) => {
  console.log("req.body", req.body);
  const { username } = req.body;
  console.log("username", username);
  if (!username || !username.trim()) {
    return res.status(400).json({ error: 'invalid-username' });
  }

  if (username.toLowerCase() === 'dog') {
    return res.status(403).json({ error: 'Insufficient permissions' });
  }

  const sid = Math.random().toString(36).substring(2);
  sessions[sid] = username;
  res.cookie('sid', sid, {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production'
  });

  res.json({ username });
});

app.get('/api/session', requireAuth, (req, res) => {
  res.json({ username: req.username });
});

app.delete('/api/session', requireAuth, (req, res) => {
  const sid = req.cookies.sid;
  delete sessions[sid];
  res.clearCookie('sid');
  res.json({ message: 'logged out' });
});

app.get('/api/movies', requireAuth, (req, res) => {
  res.json({ movies: movies[req.username] || [] });
});

app.post('/api/movies', requireAuth, validateMovieMiddleware, (req, res) => {
  if (!movies[req.username]) {
    movies[req.username] = [];
  }

  const movie = {
    id: Math.random().toString(36).substring(2),
    ...req.body
  };

  movies[req.username].push(movie);
  res.json({ movie });
});

app.delete('/api/movies/:id', requireAuth, (req, res) => {
  const movieId = req.params.id;

  if (!movies[req.username]) {
    return res.status(404).json({ error: 'movie-not-found' });
  }

  const index = movies[req.username].findIndex(movie => movie.id === movieId);
  if (index === -1) {
    return res.status(404).json({ error: 'movie-not-found' });
  }

  movies[req.username].splice(index, 1);
  res.json({ message: 'movie-deleted' });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});