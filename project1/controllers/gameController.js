const path = require('path');
const gameModel = require(path.join(__dirname, '..', 'models', 'gameModel'));
const userModel = require(path.join(__dirname, '..', 'models', 'userModel'));
const { renderLoginPage } = require(path.join(__dirname, '..', 'views', 'loginView'));
const { renderGamePage } = require(path.join(__dirname, '..', 'views', 'gameView'));

function home(req, res) {
  const sid = req.cookies.sid;
  if (!sid || !userModel.getUsername(sid)) {
    res.send(renderLoginPage());
    return;
  }

  const username = userModel.getUsername(sid);
  const gameState = gameModel.getGameState(username);
  const stats = userModel.getStats(username);
  res.send(renderGamePage(username, gameState, stats));
}

function login(req, res) {
  const { username } = req.body;
  if (username === 'dog') {
    res.send(renderLoginPage('Username "dog" is not granted access.'));
    return;
  }
  if (!/^[a-zA-Z0-9]+$/.test(username)) {
    res.send(renderLoginPage('Invalid username. Use only alphanumeric characters.'));
    return;
  }

  const sid = userModel.createSession(username);
  res.cookie('sid', sid);

  userModel.createUser(username);
  if (!gameModel.getGameState(username)) {
    gameModel.startNewGame(username);
  }
  res.redirect('/');
}

function guess(req, res) {
  const { guess } = req.body;
  const sid = req.cookies.sid;
  const username = userModel.getUsername(sid);
  const gameState = gameModel.makeGuess(username, guess);

  const gameResult = gameState.lastGuessResult;
  const gameWon = gameResult === 'correct';

  userModel.updateStats(username, gameState.attempts, gameWon);
  res.redirect('/');
}

function newGame(req, res) {
  const sid = req.cookies.sid;
  const username = userModel.getUsername(sid);
  gameModel.startNewGame(username);
  res.redirect('/');
}

function logout(req, res) {
  const sid = req.cookies.sid;
  userModel.removeSession(sid);
  res.clearCookie('sid');
  res.redirect('/');
}

module.exports = {
  home, login, guess, newGame, logout
};
