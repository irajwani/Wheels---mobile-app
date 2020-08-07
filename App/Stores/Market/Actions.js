import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({

  getProductsRequest: [],
  getProductsSuccess: ['message'],
  getProductsFailure: ['errorMessage'],

  emptyCart: [],

  handleCartRequest: ['product', 'inCart'],

  handleLikeRequest: ['payload'],
  handleLikeSuccess: ['message'],
  handleLikeFailure: ['errorMessage'],
});

export const MarketTypes = Types;
export default Creators;
