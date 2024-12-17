export const fetchLogin = (username) => {
  return fetch('/api/session', { // Ensure this matches your server endpoint
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then(err => { throw new Error(err.error); });
    }
    return res.json();
  });
};

export const fetchSession = () => {
  return fetch('/api/session').then((res) => {
    if (!res.ok) {
      throw new Error('No active session');
    }
    return res.json();
  });
};

export const fetchLogout = () => {
  return fetch('/api/session', { method: 'DELETE' }).then((res) => {
    if (!res.ok) {
      throw new Error('Logout failed');
    }
  });
};

export const fetchStoredWord = () => {
  return fetch('/api/word').then((res) => {
    if (!res.ok) {
      throw new Error('Failed to fetch stored word');
    }
    return res.json();
  });
};

export const updateStoredWord = (word) => {
  return fetch('/api/word', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ word }),
  }).then((res) => {
    if (!res.ok) {
      return res.json().then(err => { throw new Error(err.error); });
    }
    return res.json();
  });
};