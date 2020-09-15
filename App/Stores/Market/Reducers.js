import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {MarketTypes} from './Actions';

import NavigationService from '../../Services/NavigationService'

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






export const storeProductRequest = (state, {product}) => {
  
  return {
    ...state,
    product,
  }
};

export const storeProductSuccess = (state) => {
  
  return {
    ...state,
    
  }
};




export const emptyCart = (state) => ({
  ...state,
  cart: {},
});



// function insertItem(array, action) {
//   let newArray = array.slice()
//   newArray.splice(action.index, 0, action.item)
//   return newArray
// }

// function removeItem(array, action) {
//   let newArray = array.slice()
//   newArray.splice(action.index, 1)
//   return newArray
// }

export const handleCartRequest = (state, {product, inCart}) => {
  console.log("HERE CARTMAN");
  console.log(product.id);
  if (inCart) {
    let {[product.id]: remove, ...others} = state.cart;
    return {
      ...state,
      cart: others,
    }
  } else if (Object.keys(state.cart).length == 0) {
    return {
      ...state,
      cart: Object.assign({}, {[product.id]: product}),
    }
  } else {
    return {
      ...state,
      cart: {
        ...state.cart,
        [product.id]: product,
      },
    }
  }
};










export const handleLikeRequest = (state) => {
  return {
    ...state,
    isLoading: true,
    addStatus: 'running',
  };
};

export const handleLikeSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    isLoading: false,
    addStatus: 'idle',
  };
};

export const handleLikeFailure = (state, {errorMessage}) => {
  return {
    ...state,
    errorMessage,
    isLoading: false,
    addStatus: 'idle',
  };
};








export const createOrderRequest = (state) => {
  return {
    ...state,
    isLoading: true,
  };
};

export const createOrderSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    isLoading: false,
  };
};

export const createOrderFailure = (state, {errorMessage}) => {
  return {
    ...state,
    errorMessage,
    isLoading: false,
  };
};







export const getOrdersRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getOrdersSuccess = (state, {message}) => {
  return {
    ...state,
    orders: message,
    isLoading: false,
  };
};

export const getOrdersFailure = (state, {errorMessage}) => ({
  ...state,
  errorMessage,
  isLoading: false,
});










export const updateOrderRequest = (state) => {
  return {
    ...state,
    isLoading: true,
    addStatus: 'running',
  };
};

export const updateOrderSuccess = (state, {message}) => {
  return {
    ...state,
    message,
    isLoading: false,
    addStatus: 'idle',
  };
};

export const updateOrderFailure = (state, {errorMessage}) => {
  return {
    ...state,
    errorMessage,
    isLoading: false,
    addStatus: 'idle',
  };
};

export const reducer = createReducer(INITIAL_STATE, {
  [MarketTypes.GET_PRODUCTS_REQUEST]: getProductsRequest,
  [MarketTypes.GET_PRODUCTS_SUCCESS]: getProductsSuccess,
  [MarketTypes.GET_PRODUCTS_FAILURE]: getProductsFailure,

  [MarketTypes.STORE_PRODUCT_REQUEST]: storeProductRequest,
  [MarketTypes.STORE_PRODUCT_SUCCESS]: storeProductSuccess,

  [MarketTypes.EMPTY_CART]: emptyCart,

  [MarketTypes.HANDLE_CART_REQUEST]: handleCartRequest,

  [MarketTypes.HANDLE_LIKE_REQUEST]: handleLikeRequest,
  [MarketTypes.HANDLE_LIKE_SUCCESS]: handleLikeSuccess,
  [MarketTypes.HANDLE_LIKE_FAILURE]: handleLikeFailure,

  [MarketTypes.CREATE_ORDER_REQUEST]: createOrderRequest,
  [MarketTypes.CREATE_ORDER_SUCCESS]: createOrderSuccess,
  [MarketTypes.CREATE_ORDER_FAILURE]: createOrderFailure,

  [MarketTypes.GET_ORDERS_REQUEST]: getOrdersRequest,
  [MarketTypes.GET_ORDERS_SUCCESS]: getOrdersSuccess,
  [MarketTypes.GET_ORDERS_FAILURE]: getOrdersFailure,

  [MarketTypes.UPDATE_ORDER_REQUEST]: updateOrderRequest,
  [MarketTypes.UPDATE_ORDER_SUCCESS]: updateOrderSuccess,
  [MarketTypes.UPDATE_ORDER_FAILURE]: updateOrderFailure,
});
