import { checkSession } from './models/services.js';
import { showLoginWithError, showChat, initEventListeners } from './views/views.js';
import { setState } from './models/state.js';


function init() {                           // Initialize the application and check user session
    checkSession()
        .then(user => {
            if (user) {
                setState({ user }); 
                showChat(); 
            } else {
                showLoginWithError('Please log in.'); // Prompt for login if not authenticated
            }
        })
        .catch(() => showLoginWithError('Please log in.')); // Handle errors by prompting for login
}


init();                                                          // Initialize app on load
initEventListeners(); 