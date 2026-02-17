import api from './api'; // Importamos la instancia de axios que configuramos antes

const authService = {
  login: async (email, password) => {
    // Post al endpoint que probamos en Postman
    const response = await api.post('/auth/login', { email, password });
    return response.data; // Devuelve token y datos de usuario
  },

  register: async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password });
    return response.data;
  },
  uploadAvatar: async (formData) => {
    const response = await api.post('/auth/avatar', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
},
};

export default authService;