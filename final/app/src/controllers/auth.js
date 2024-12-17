import * as sessions from '../models/sessions.js';

export function checkSession(req, res) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
}

export function checkAuth(req, res, next) {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  
  if(!sid || !username) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  req.username = username;
  next();
}

export function login(req, res) {
  const { username } = req.body;
  
  if(!username || username === 'dog' || !/^[A-Za-z0-9_]+$/.test(username)) {
    res.status(400).json({ error: 'invalid-username' });
    return;
  }
  
  const sid = sessions.addSession(username);
  res.cookie('sid', sid);
  res.json({ username });
}

export function logout(req, res) {
  const sid = req.cookies.sid;
  sessions.deleteSession(sid);
  res.clearCookie('sid');
  res.json({ message: 'logged out' });
}