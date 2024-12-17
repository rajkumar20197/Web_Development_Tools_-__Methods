import { randomUUID } from 'crypto';

const movies = {};

export function getMovies(username) {
  return movies[username] || [];
}

export function addMovie(username, movieData) {
  if (!movies[username]) {
    movies[username] = [];
  }

  const movie = {
    id: randomUUID(),
    ...movieData,
    timestamp: Date.now(),
  };

  movies[username].push(movie);
  return movie;
}

export function deleteMovie(username, movieId) {
  if (!movies[username]) {
    return false;
  }

  const index = movies[username].findIndex(movie => movie.id === movieId);
  if (index === -1) {
    return false;
  }

  movies[username].splice(index, 1);
  return true;
}


app.get('/api/movies/:username', (req, res) => {
  const { username } = req.params;
  const userMovies = getMovies(username);
  res.json(userMovies);
});


app.post('/api/movies/:username', (req, res) => {
  const { username } = req.params;
  const errors = validateMovie(req.body);
  
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'validation-failed',
      details: errors
    });
  }

  const newMovie = addMovie(username, req.body);
  res.status(201).json(newMovie);
});


app.delete('/api/movies/:username/:movieId', (req, res) => {
  const { username, movieId } = req.params;
  const deleted = deleteMovie(username, movieId);
  
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { getMovies, addMovie, deleteMovie };