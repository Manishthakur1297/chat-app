import axios from 'axios'

export const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    timeout: 5000,
    headers: {
        'x-auth-token': localStorage.getItem('token'),
        'Content-Type': 'application/json'
    }
});

export const registerInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/',
    timeout: 5000,
    headers: {
        'x-auth-token': null,
        'Content-Type': 'application/json'
    }
});


// axiosInstance.interceptors.response.use(
//     response => response,
//     error => {
//       const originalRequest = error.config;
      
//       if (error.response.status === 401 && error.response.statusText === "Unauthorized") {
//           const refresh_token = localStorage.getItem('refresh_token');

//           return axiosInstance
//               .post('/login/refresh/', {refresh: refresh_token})
//               .then((response) => {

//                   localStorage.setItem('access_token', response.data.access);
//                   localStorage.setItem('refresh_token', response.data.refresh);

//                   axiosInstance.defaults.headers['Authorization'] = "JWT " + response.data.access;
//                   originalRequest.headers['Authorization'] = "JWT " + response.data.access;

//                   return axiosInstance(originalRequest);
//               })
//               .catch(err => {
//                   console.log(err)
//               });
//       }
//       return Promise.reject(error);
//   }
// );
//export default axiosInstance