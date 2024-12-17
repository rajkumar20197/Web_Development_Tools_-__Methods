import movieIcon from '../assets/movie.svg';
import deleteIcon from '../assets/delete.svg';
import '../styles/movies.css';

function MovieList({ movies, onDeleteMovie }) {
  if (!movies || movies.length === 0) {
    return (
      <div className="movies-empty">
        <img src={movieIcon} alt="" className="empty-icon" />
        <h2>No Movies Yet</h2>
        <p>Your movie collection is empty. Click "Add New Movie" to get started!</p>
      </div>
    );
  }

  return (
    <div className="movies-container">
      <h2 className="movies-title">
        <img src={movieIcon} alt="" className="section-icon" />
        Your Movie Collection
        <span className="movie-count">{movies.length}</span>
      </h2>
      
      <div className="movie-grid">
        {movies.map(movie => (
          <div key={movie.id} className="movie-card">
            <div className="movie-card-header">
              <h3>{movie.title}</h3>
              <button 
                onClick={() => onDeleteMovie(movie.id)}
                className="delete-button"
                aria-label="Delete movie"
              >
                <img src={deleteIcon} alt="" className="delete-icon" />
              </button>
            </div>
            
            <div className="movie-card-content">
              <div className="movie-info">
                <span className="label">Director:</span>
                <span className="value">{movie.director}</span>
              </div>
              <div className="movie-info">
                <span className="label">Year:</span>
                <span className="value">{movie.year}</span>
              </div>
              <div className="movie-info">
                <span className="label">Genre:</span>
                <span className="value">{movie.genre}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;