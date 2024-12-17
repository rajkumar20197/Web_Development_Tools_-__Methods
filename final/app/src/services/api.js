const API_BASE = process.env.NODE_ENV === 'production' 
  ? '/api'
  : 'http://localhost:3000/api';

export { API_BASE };

export function fetchSession() {
  return fetch(`${API_BASE}/session`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Session not found');
    }
    return response.json();
  });
}

export function login(username) {
  console.log('Making login request for:', username);
  return fetch(`${API_BASE}/session`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  })
  .then(response => {
    console.log('Login response status:', response.status);
    if (!response.ok) {
      return response.json().then(err => {
        console.error('Login error:', err);
        return Promise.reject(err);
      });
    }
    return response.json().then(data => {
      console.log('Login success:', data);
      return data;
    });
  })
  .catch(err => {
    console.error('Network error:', err);
    throw err;
  });
}

export function logout() {
  return fetch(`${API_BASE}/session`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

export function fetchMovies() {
  return fetch(`${API_BASE}/movies`, {
    method: 'GET',
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

export function addMovie(movieData) {
  return fetch(`${API_BASE}/movies`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movieData),
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}

export function deleteMovie(movieId) {
  return fetch(`${API_BASE}/movies/${movieId}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(response => {
    if (!response.ok) {
      return response.json().then(err => Promise.reject(err));
    }
    return response.json();
  });
}