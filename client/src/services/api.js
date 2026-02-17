import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // La URL de tu Backend
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor: Antes de cada petición, inyecta el token si existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;