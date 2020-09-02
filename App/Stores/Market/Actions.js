import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  getProductsRequest: [],
  getProductsSuccess: ['message'],
  getProductsFailure: ['errorMessage'],

  storeProductRequest: ['product'],
  storeProductSuccess: [],

  emptyCart: [],

  handleCartRequest: ['product', 'inCart'],

  handleLikeRequest: ['payload'],
  handleLikeSuccess: ['message'],
  handleLikeFailure: ['errorMessage'],

  createOrderRequest: ['payload'],
  createOrderSuccess: ['message'],
  createOrderFailure: ['errorMessage'],

  getOrdersRequest: ['uid'],
  getOrdersSuccess: ['message'],
  getOrdersFailure: ['errorMessage'],

  updateOrderRequest: ['payload'],
  updateOrderSuccess: ['message'],
  updateOrderFailure: ['errorMessage'],
});

export const MarketTypes = Types;
export default Creators;
