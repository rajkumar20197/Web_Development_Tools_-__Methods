import * as Movies from '../models/movies.js';
const validateMovie = require('../validators/movieValidator.js');

export function listMovies(req, res) {
  const movies = Movies.getMovies(req.username);
  res.json({ movies });
}

export function addMovie(req, res) {
  const errors = validateMovie(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'validation-failed',
      details: errors
    });
  }

  const { title, director, category, year } = req.body;
  
  const movie = Movies.addMovie(req.username, {
    title,
    director,
    category,
    year: parseInt(year),
  });

  res.json({ movie });
}

export function deleteMovie(req, res) {
  const { id } = req.params;
  const success = Movies.deleteMovie(req.username, id);
  
  if (!success) {
    res.status(404).json({ error: 'movie-not-found' });
    return;
  }

  res.json({ message: 'movie deleted' });
}

export function generateMovieList(movies) {
  return `
    <div class="movie-list">
      ${movies.map(movie => `
        <div class="movie-card">
          <h3>${movie.title}</h3>
          <p>Director: ${movie.director}</p>
          <p>Year: ${movie.year}</p>
          <p>Category: ${movie.category}</p>
          <button class="delete-btn" data-id="${movie.id}">Delete</button>
        </div>
      `).join('')}
    </div>
  `;
}