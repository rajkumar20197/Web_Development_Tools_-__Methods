import { useReducer, useEffect } from 'react';
import { movieReducer, initialState } from './reducers/movieReducer';
import {
  fetchSession,
  fetchMovies,
  login,
  logout,
  addMovie,
  deleteMovie,
} from './services/api';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import MovieForm from './components/MovieForm';
import MovieList from './components/MovieList';
import './styles/main.css';

function App() {
  const [state, dispatch] = useReducer(movieReducer, initialState);
  const { movies, loading, error, username } = state;

  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    fetchSession()
      .then(data => {
        dispatch({ type: 'SET_USERNAME', payload: data.username });
        return fetchMovies();
      })
      .then(response => {
        if (response) {
          dispatch({ type: 'SET_MOVIES', payload: response.movies });
        }
      })
      .catch(err => {
        if (err.error !== 'auth-missing') {
          dispatch({ type: 'SET_ERROR', payload: err.error });
        }
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const handleLogin = (username) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });

    login(username)
      .then(data => {
        if (data.error) {
          throw new Error(data.error);
        }
        dispatch({ type: 'SET_USERNAME', payload: data.username });
        return fetchMovies();
      })
      .then(moviesData => {
        if (moviesData.movies) {
          dispatch({ type: 'SET_MOVIES', payload: moviesData.movies });
        } else {
          dispatch({ type: 'SET_MOVIES', payload: [] });
        }
      })
      .catch(err => {
        dispatch({ 
          type: 'SET_ERROR', 
          payload: err.message === 'invalid-username' 
            ? 'Invalid username. Username "dog" is not allowed.'
            : 'Login failed. Please try again.'
        });
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const handleLogout = () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    logout()
      .then(() => {
        dispatch({ type: 'RESET_STATE' });
      })
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.error }))
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const handleAddMovie = (movieData) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    addMovie(movieData)
      .then(response => {
        dispatch({ type: 'ADD_MOVIE', payload: response.movie });
        dispatch({ type: 'SET_ERROR', payload: null });
      })
      .catch(err => {
        if (err.details) {
          dispatch({ type: 'SET_ERROR', payload: err.details.join('\n') });
        } else {
          dispatch({ type: 'SET_ERROR', payload: err.error });
        }
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  const handleDeleteMovie = (movieId) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    deleteMovie(movieId)
      .then(() => {
        dispatch({ type: 'DELETE_MOVIE', payload: movieId });
        dispatch({ type: 'SET_ERROR', payload: null });
      })
      .catch(err => dispatch({ type: 'SET_ERROR', payload: err.error }))
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
  };

  return (
    <div className="app">
      <Header 
        username={username} 
        onLogout={handleLogout} 
      />

      <main>
        {error && <div className="error">{error}</div>}
        {loading && <div className="loading">Loading...</div>}
        {!username ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <>
            <MovieForm onAddMovie={handleAddMovie} />
            <MovieList 
              movies={movies}
              onDeleteMovie={handleDeleteMovie}
            />
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;