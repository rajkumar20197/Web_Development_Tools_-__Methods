import { useState } from 'react';
import '../styles/forms.css';

function MovieForm({ onAddMovie }) {
  const [movieData, setMovieData] = useState({
    title: '',
    director: '',
    year: '',
    genre: ''
  });
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!movieData.title.trim()) {
      return 'Title is required';
    }
    if (!movieData.director.trim()) {
      return 'Director is required';
    }
    
    const yearNum = Number(movieData.year);
    const currentYear = new Date().getFullYear();
    if (!movieData.year || yearNum < 1888 || yearNum > currentYear) {
      return `Year must be between 1888 and ${currentYear}`;
    }
    
    if (!movieData.genre) {
      return 'Genre is required';
    }

    if (!/^[a-zA-Z0-9\s\-:,.']+$/.test(movieData.title)) {
      return 'Title contains invalid characters';
    }
    if (!/^[a-zA-Z\s\-.']+$/.test(movieData.director)) {
      return 'Director name contains invalid characters';
    }

    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    onAddMovie(movieData)
      .then(() => {
        setMovieData({
          title: '',
          director: '',
          year: '',
          genre: ''
        });
        setError('');
      })
      .catch(err => {
        setError(err.error || 'Failed to add movie');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  return (
    <div className="add-movie-section">
      <h2>Add New Movie</h2>
      
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}

      <form className="movie-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="title">Movie Title:</label>
          <input
            id="title"
            name="title"
            value={movieData.title}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="director">Director:</label>
          <input
            id="director"
            name="director"
            value={movieData.director}
            onChange={handleChange}
          />
        </div>

        <div className="form-field">
          <label htmlFor="year">Release Year:</label>
          <input
            type="number"
            id="year"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            min="1888"
            max={new Date().getFullYear()}
          />
        </div>

        <div className="form-field">
          <label htmlFor="genre">Genre:</label>
          <select
            id="genre"
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
          >
            <option value="">Select a genre</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
          </select>
        </div>

        <button type="submit" className="button">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default MovieForm;