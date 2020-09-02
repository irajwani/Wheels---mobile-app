import {Config} from '../Config';

let {ApiClient} = Config;

let fulfilled = (response) => response;

function getProducts() {
  return ApiClient.get('/getProducts').then(fulfilled);
}

function handleLike(payload) {
  return ApiClient.post('/handleLike', payload).then(fulfilled);
}

function createOrder(payload) {
  return ApiClient.post('/createOrder', payload).then(fulfilled);
}

function getOrders(payload) {
  return ApiClient.get(`/getOrders?uid=${payload.uid}`).then(fulfilled);
}

function updateOrder(payload) {
  return ApiClient.post('/updateOrder', payload).then(fulfilled);
}

export default {
  getProducts,
  handleLike,
  createOrder,
  getOrders,
  updateOrder,
};
