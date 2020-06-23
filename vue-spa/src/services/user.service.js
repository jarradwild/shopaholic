import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/';

class UserService {

  getUserOrders() {
    return axios.get(API_URL + 'my-orders', { headers: authHeader() });
  }

  getUserOrder(id) {
    return axios.get(API_URL + 'my-orders/' + id, { headers: authHeader() });
  }

  postNewOrder(newOrder) {
    return axios.post(API_URL + 'my-orders', newOrder, { headers: authHeader() });
  }
}

export default new UserService();