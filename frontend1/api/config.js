// API Configuration for React Native App
const API_CONFIG = {
  // Base URL for the backend API
  BASE_URL: __DEV__ 
    ? 'http://localhost:8000/api'  // Development
    : 'https://your-production-domain.com/api', // Production
  
  // API endpoints
  ENDPOINTS: {
    // Authentication
    REGISTER: '/auth/register',
    LOGIN: '/auth/login',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/me',
    
    // Posts
    POSTS: '/posts',
    MY_POSTS: '/my-posts',
    
    // Users
    USERS: '/users',
  },
  
  // Request timeout
  TIMEOUT: 10000, // 10 seconds
  
  // Headers
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
};

export default API_CONFIG;