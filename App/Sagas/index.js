import {takeLatest, all} from 'redux-saga/effects';

import {AuthTypes} from '../Stores/Auth/Actions';
import {MarketTypes} from '../Stores/Market/Actions';
import {ContactTypes} from '../Stores/Contact/Actions';

import {getProfile, createUser} from './AuthSaga';
import {sendMessage} from './ContactSaga';
import {
  getProducts,
  handleLike,
  createOrder,
  getOrders,
  storeProduct,
  updateOrder,
} from './MarketSaga';


export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts

    takeLatest(AuthTypes.CREATE_USER_REQUEST, createUser),
    takeLatest(AuthTypes.GET_PROFILE_REQUEST, getProfile),

    takeLatest(MarketTypes.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(MarketTypes.STORE_PRODUCT_REQUEST, storeProduct),
    takeLatest(MarketTypes.HANDLE_LIKE_REQUEST, handleLike),
    takeLatest(MarketTypes.CREATE_ORDER_REQUEST, createOrder),
    takeLatest(MarketTypes.GET_ORDERS_REQUEST, getOrders),
    takeLatest(MarketTypes.UPDATE_ORDER_REQUEST, updateOrder),

    takeLatest(ContactTypes.SEND_MESSAGE_REQUEST, sendMessage),
  ]);
}
