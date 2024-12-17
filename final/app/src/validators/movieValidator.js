const validateMovie = (movie) => {
    const errors = [];
  
   
    if (!movie.title || typeof movie.title !== 'string') { 
      errors.push('Title is required and must be a string');
    } else if (movie.title.trim().length === 0) {
      errors.push('Title cannot be empty');
    } else if (movie.title.length > 100) {
      errors.push('Title must be less than 100 characters');
    }
  
    
    if (!movie.director || typeof movie.director !== 'string') { 
      errors.push('Director is required and must be a string');
    } else if (movie.director.trim().length === 0) {
      errors.push('Director cannot be empty');
    } else if (movie.director.length > 50) {
      errors.push('Director name must be less than 50 characters');
    }
  
   
    const currentYear = new Date().getFullYear();      
    const yearNum = Number(movie.year);
    if (!movie.year) {
      errors.push('Year is required');
    } else if (isNaN(yearNum) || yearNum < 1888 || yearNum > currentYear) {
      errors.push(`Year must be a valid number between 1888 and ${currentYear}`);
    }
  
   
    const validGenres = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi']; 
    if (!movie.genre || typeof movie.genre !== 'string') {
      errors.push('Genre is required and must be a string');
    } else if (!validGenres.includes(movie.genre)) {
      errors.push('Invalid genre selected');
    }
  
    return errors;
  };
  
  export default validateMovie;