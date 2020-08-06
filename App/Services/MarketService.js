import {Config} from '../Config';

let {ApiClient} = Config;

let fulfilled = (response) => response;

function getProducts() {
  return ApiClient.get('/getProducts').then(fulfilled);
}

function handleLike() {
  return ApiClient.post('/handleLike').then(fulfilled);
}

export default {
  getProducts,
  handleLike,
};
