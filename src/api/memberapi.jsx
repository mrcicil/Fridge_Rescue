import axios from 'axios';
// const BASE_URL = 'http://localhost:8080';
// const memberAPI = axios.create({ baseURL: BASE_URL });


// Create an axios instance with the correct base URL and CORS settings
const memberAPI = axios.create({ 
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  },
  // Important for CORS with credentials
  withCredentials: true
});

// Add request interceptor for debugging
memberAPI.interceptors.request.use(
  config => {
    console.log('Request being sent:', config);
    return config;
  },
  error => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
memberAPI.interceptors.response.use(
  response => {
    console.log('Response received:', response);
    return response;
  },
  error => {
    console.error('Response error:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      console.error('Error headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
    }
    return Promise.reject(error);
  }
);

export default memberAPI;
