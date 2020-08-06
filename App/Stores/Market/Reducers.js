import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {MarketTypes} from './Actions';

export const getProductsRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getProductsSuccess = (state, {message}) => {
  return {
    ...state,
    products: message,
    isLoading: false,
  };
};

export const getProductsFailure = (state, {errorMessage}) => ({
  ...state,
  errorMessage,
  isLoading: false,
});

export const handleCartRequest = (state, {product, inCart}) => {
  if (inCart) {
    state.cart = delete state.cart[product.id];
  } else {
    state.cart[product.id] = product;
  }
  return {
    ...state,
    isLoading: true,
  };
};

export const handleCartSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    isLoading: false,
  };
};

export const handleLikeRequest = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

export const handleLikeSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    isLoading: false,
  };
};

export const handleLikeFailure = (state, {errorMessage}) => {
  return {
    ...state,
    errorMessage,
    isLoading: false,
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [MarketTypes.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [MarketTypes.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [MarketTypes.GET_PRODUCTS_FAILURE]: getProductsFailure,

  [MarketTypes.HANDLE_CART_REQUEST]: handleCartRequest,
  [MarketTypes.HANDLE_CART_SUCCESS]: handleCartSuccess,

  [MarketTypes.HANDLE_LIKE_REQUEST]: handleLikeRequest,
  [MarketTypes.HANDLE_LIKE_SUCCESS]: handleLikeSuccess,
  [MarketTypes.HANDLE_LIKE_FAILURE]: handleLikeFailure,
});
