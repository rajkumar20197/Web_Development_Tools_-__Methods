import * as movies from '../models/movies.js';

export function listMovies(req, res) {
  const { username } = req;
  const userMovies = movies.getMovies(username);
  res.json({ movies: userMovies });
}

export function addMovie(req, res) {
  const { username } = req;
  const movieData = req.body;
  
  if(!movieData.title || !movieData.director || !movieData.category || !movieData.year) {
    res.status(400).json({ error: 'missing-fields' });
    return;
  }
  
  const movie = movies.addMovie(username, movieData);
  res.json({ movie });
}

export function deleteMovie(req, res) {
  const { username } = req;
  const { id } = req.params;
  
  const success = movies.deleteMovie(username, id);
  if(!success) {
    res.status(404).json({ error: 'movie-not-found' });
    return;
  }
  
  res.json({ message: 'movie deleted' });
}