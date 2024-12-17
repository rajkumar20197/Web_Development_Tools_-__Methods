export const initialState = {
    movies: [],
    loading: false,
    error: null,
    username: null
  };
  
  export function movieReducer(state, action) {
    console.log('Reducer:', action.type, action.payload);
    
    switch (action.type) {
      case 'SET_USERNAME':
        return {
          ...state,
          username: action.payload,
          error: null
        };
      case 'SET_MOVIES':
        return {
          ...state,
          movies: action.payload || [],
          error: null
        };
      case 'ADD_MOVIE':
        return {
          ...state,
          movies: [...state.movies, action.payload],
          error: null
        };
      case 'DELETE_MOVIE':
        return {
          ...state,
          movies: state.movies.filter(movie => movie.id !== action.payload),
          error: null
        };
      case 'SET_LOADING':
        return {
          ...state,
          loading: action.payload
        };
      case 'SET_ERROR':
        return {
          ...state,
          error: action.payload
        };
      case 'RESET_STATE':
        return initialState;
      default:
        return state;
    }
  }