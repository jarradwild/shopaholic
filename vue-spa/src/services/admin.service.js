import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/admin/';

class AdminService {
  getOrders() {
    return axios.get(API_URL + 'orders', { headers: authHeader() });
  }

  deleteOrder(id) {
    return axios.delete(API_URL + 'orders/' + id, { headers: authHeader() });
  }

  updateOrderStatus(data) {
    return axios.put(API_URL + 'orders/' + data.id + '/status', data, { headers: authHeader() });
  }

  addOrderNote(data) {
    return axios.put(API_URL + 'orders/'+ data.id + '/add-note', {date: data.date, message: data.message}, { headers: authHeader() });
  }

  getCustomerFromOrder(id) {
    return axios.get(API_URL + 'orders/'+id+'/user', { headers: authHeader() });
  }
}

export default new AdminService();