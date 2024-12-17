const users = {
    admin: { role: 'admin' },
    regular: { role: 'user' },
    dog: { role: 'unauthorized' }
  };
  
  export function getUserRole(username) {
    return users[username]?.role || 'user';
  }
  
  export function isAuthorized(username, requiredRole) {
    if (username === 'dog') {
      return false;
    }
    
    const userRole = getUserRole(username);
    switch(requiredRole) {
      case 'admin':
        return userRole === 'admin';
      case 'user':
        return userRole === 'admin' || userRole === 'user';
      default:
        return false;
    }
  }