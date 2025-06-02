// utils/auth.js
// Utility functions for authentication

export const getToken = () => {
  return localStorage.getItem('token'); // or your token key
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export const isAuthenticated = () => {
  const token = getToken();
  return !!token; // Convert to boolean
};

// Optional: Add token validation if you want to check token expiry
export const isTokenValid = () => {
  const token = getToken();
  if (!token) return false;
  
  try {
    // If using JWT, you can decode and check expiry
    // const decoded = jwt_decode(token);
    // const currentTime = Date.now() / 1000;
    // return decoded.exp > currentTime;
    
    // For now, just check if token exists
    return true;
  } catch (error) {
    console.error('Token validation error:', error);
    return false;
  }
};

// Logout function
export const logout = () => {
  removeToken();
  // Optionally clear other user data
  // localStorage.clear(); // Use this if you want to clear all localStorage
  window.location.href = '/login'; // Redirect to login
};