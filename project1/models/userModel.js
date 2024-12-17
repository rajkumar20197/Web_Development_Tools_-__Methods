const crypto = require('crypto');

class UserModel {
  constructor() {
    this.users = {};
    this.sessions = {};
  }

  createSession(username) {
    const sid = crypto.randomUUID();
    this.sessions[sid] = username;
    return sid;
  }

  getUsername(sid) {
    return this.sessions[sid];
  }

  removeSession(sid) {
    delete this.sessions[sid];
  }

  createUser(username) {
    if (!this.users[username]) {
      this.users[username] = {
        gamesPlayed: 0,
        gamesWon: 0,
        bestScore: Infinity
      };
    }
    return this.users[username];
  }

  updateStats(username, attempts, won) {
    const user = this.users[username];
    user.gamesPlayed++;
    if (won) {
      user.gamesWon++;
      user.bestScore = Math.min(user.bestScore, attempts);
    }
  }

  getStats(username) {
    return this.users[username];
  }
}

module.exports = new UserModel();
