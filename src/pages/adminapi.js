// import axios from 'axios';

// const apiAdmin = axios.create({
//   baseURL: `${"http://192.168.31.133"}/admin`
// });

// // Add a request interceptor
// apiAdmin.interceptors.request.use(
//   config => {
//     const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// export default apiAdmin;

import axios from 'axios';

const apiAdmin = axios.create({
  baseURL: `${"http://192.168.31.133"}/admin`
});

// Add a request interceptor
apiAdmin.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default apiAdmin;

