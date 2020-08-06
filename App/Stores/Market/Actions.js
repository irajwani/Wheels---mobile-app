import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({

  getProductsRequest: [],
  getProductsSuccess: ['message'],
  getProductsFailure: ['errorMessage'],

  handleCartRequest: ['product', 'inCart'],
  handleCartSuccess: ['message'],

  handleLikeRequest: ['payload'],
  handleLikeSuccess: ['message'],
  handleLikeFailure: ['errorMessage'],
});

export const MarketTypes = Types;
export default Creators;
