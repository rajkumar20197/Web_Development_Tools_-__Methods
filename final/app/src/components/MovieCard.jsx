import '../styles/movies.css';

function MovieCard({ movie, onDelete }) {
  return (
    <div className="movie-card">
      <h3>{movie.title}</h3>
      <p><strong>Director:</strong> {movie.director}</p>
      <p><strong>Category:</strong> {movie.category}</p>
      <p><strong>Year:</strong> {movie.year}</p>
      <button 
        className="delete-btn"
        onClick={() => onDelete(movie.id)}
      >
        Delete
      </button>
    </div>
  );
}

export default MovieCard;