let state = { user: null }; 


export function setState(newState) {              // Update the state with new values
    state = { ...state, ...newState }; 
}


export function getState() {                      // Retrieve the current application state
    return state; 
}