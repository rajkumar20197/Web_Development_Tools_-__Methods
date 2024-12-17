const express = require('express');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');
const authController = require('./controllers/authController');
const userModel = require('./models/user');
const loginView = require('./views/login');
const dataView = require('./views/data');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', (req, res) => {
  const sid = req.cookies.sid;
  const username = authController.isAuthenticated(sid);
  
  if (username) {
    const storedWord = userModel.getStoredWord(username);
    res.send(dataView.generateDataPage(username, storedWord));
  } else {
    res.send(loginView.generateLoginPage());
  }
});

app.post('/login', (req, res) => {
  const { username } = req.body;

  if (!username || !/^[a-zA-Z0-9]+$/.test(username)) {
    return res.status(400).send(loginView.generateErrorPage('Invalid username. Please use only letters and numbers.', '/'));
  }

  if (username === 'dog') {
    return res.status(403).send(loginView.generateErrorPage('Username "dog" is not allowed.', '/'));
  }

  const sid = authController.login(username);
  res.cookie('sid', sid, { httpOnly: true });
  res.redirect('/');
});

app.post('/logout', (req, res) => {
  const sid = req.cookies.sid;
  authController.logout(sid);
  res.clearCookie('sid');
  res.redirect('/');
});

app.post('/update-word', (req, res) => {
  const sid = req.cookies.sid;
  const username = authController.isAuthenticated(sid);
  
  if (username) {
    const { newWord } = req.body;
    userModel.setStoredWord(username, newWord);
  }
  
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));