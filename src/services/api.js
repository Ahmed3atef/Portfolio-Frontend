import axios from 'axios';

// 👇 DEFINE YOUR DJANGO BACKEND URL HERE
const API_BASE_URL = "https://portfolio-backend-7a2b6514.koyeb.app/api"; 
// Example: 'http://127.0.0.1:8000/api'

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;