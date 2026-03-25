import axios from 'axios';

const api = axios.create({
  baseURL: `${"http://192.168.31.133"}/api`
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('ssid'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;
