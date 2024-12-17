# Movie Collection Application

A web application for managing personal movie collections.

## Features
- User authentication (no passwords required)
- Add, view, and delete movies
- Input validation for movie details
- Secure session management

## Usage
1. Start the application: 
   npm install
   npm run build
   npm start  
2. Access at http://localhost:3000
3. Login with any username (except 'dog')
4. Add movies with required details:
   - Title (max 100 characters)
   - Director (max 50 characters)
   - Year (between 1888 and current year)
   - Genre (from predefined list)

## Security Features
- Input sanitization
- Session-based authentication
- XSS protection
- CSRF protection via same-site cookies

## Technical Details
- React frontend (Vite)
- Express backend
- RESTful API endpoints
- Client-side and server-side validation

## Features
- User authentication and authorization
- Movie management (add, delete)
- Form validation with visual feedback
- Error handling and user notifications
- Responsive design

## Technical Details
- React frontend with Vite
- Express backend
- State management with useReducer
- Client-side form validation
- Session-based authentication

## Media Attribution
- Movie icon: Google Material Icons 