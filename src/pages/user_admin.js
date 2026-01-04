import axios from 'axios';

const api_user_admin = axios.create({
  baseURL: `${"http://localhost"}/user_admin`
});

// Add a request interceptor
api_user_admin.interceptors.request.use(
  config => {
    const token = localStorage.getItem('admin_token'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api_user_admin;
