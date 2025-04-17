// src/axiosInstance.ts
import axios from 'axios';
// API base URL (adjust this based on your API server URL)
import { API_URL } from './routes';

// Create axios instance for guest requests (no authorization token)
const guestRequest = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json', // You can add more headers if needed
    },
});

// Create axios instance for user requests (with access token from localStorage)
const userRequest = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json', // You can add more headers if needed
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,  // Attach access token here
    },
});

// Optionally, you can set up interceptors to add the token dynamically (for better management)

userRequest.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;  // Attach token if exists
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export { guestRequest, userRequest };
