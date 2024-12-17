const users = {};

function getStoredWord(username) {
  return users[username] || '';
}

function setStoredWord(username, word) {
  users[username] = word;
}

module.exports = {
  getStoredWord,
  setStoredWord,
};