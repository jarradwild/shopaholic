import axios from 'axios';
import store from '../store/index';
import router from '../router';

export default function setup() {
  axios.interceptors.response.use( (response) => {
    // Return a successful response back to the calling service
    return response;
  }, (error) => {
    // Return any error which is not due to authentication back to the calling service
    if (error.response.status !== 401) {
      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Logout user if token refresh didn't work or user is disabled
    if (error.config.url == '/api/auth/refresh' || error.response.message == 'Account is disabled.') {
      
      store.dispatch('auth/logout')
      router.push({ name: 'login' });

      return new Promise((resolve, reject) => {
        reject(error);
      });
    }

    // Try request again with new token
    return store.dispatch('auth/refresh')
      .then((token) => {

        // New request with new token
        const config = error.config;
        config.headers['Authorization'] = `Bearer ${token}`;
        localStorage.setItem('user', JSON.stringify(token))

        return new Promise((resolve, reject) => {
          axios.request(config).then(response => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          })
        });

      })
      .catch((error) => {
        Promise.reject(error);
      });
  });
}

// export default function setup() {
//   axios.interceptors.response.use(
//     response => response,
//     error => {
//       if (error.response.status === 401) {
//         return store
//           .dispatch('auth/logout', null, {root:true})
//           .then(() => {
//             router.push('/login');
//           })
//           .catch(e => {
//             router.push('/login');
//             return Promise.reject(error);
//           });
//       }
  
//       return Promise.reject(error);
//     }
//   );
// }