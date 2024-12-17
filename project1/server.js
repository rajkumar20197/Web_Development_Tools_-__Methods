const express = require('express');
const cookieParser = require('cookie-parser');
const gameController = require('./controllers/gameController');
const Words = require('./words');
const crypto = require('crypto');
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.get('/', gameController.home);
app.post('/login', gameController.login);
app.post('/guess', gameController.guess);
app.post('/new-game', gameController.newGame);
app.post('/logout', gameController.logout);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
