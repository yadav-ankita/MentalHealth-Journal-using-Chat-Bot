//  frontend/axios.js
import axios from 'axios';
// Set base URL
axios.defaults.baseURL = 'https://my-backend-8hi0.onrender.com/api/v1';
// Add request interceptor
axios.interceptors.request.use(
    (req) => {
        const user = localStorage.getItem('user');
      if (user) {
            try {
                const { token } = JSON.parse(user);
                req.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error('Error parsing user from localStorage:', error);
            }
        }
        return req;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export default axios;
