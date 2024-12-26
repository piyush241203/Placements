import axios from 'axios';
import Cookies from 'js-cookie';

// Create an Axios instance with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your backend API base URL
});

// Intercept requests to add token to headers if available in cookies
axiosInstance.interceptors.request.use((config) => {
    const token = Cookies.get('token');
  
      console.log("Token being sent:", token); 
  
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
  
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
  

export default axiosInstance;
