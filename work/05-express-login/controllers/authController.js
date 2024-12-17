const crypto = require('crypto');
const sessions = {};

function isAuthenticated(sid) {
  return sessions[sid]?.username;
}

function login(username) {
  const sid = crypto.randomUUID();
  sessions[sid] = { username };
  return sid;
}

function logout(sid) {
  delete sessions[sid];
}

module.exports = {
  isAuthenticated,
  login,
  logout,
};