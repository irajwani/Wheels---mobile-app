import {put, call} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import MarketActions from '../Stores/Market/Actions';
import MarketService from '../Services/MarketService';
import NavigationService from '../Services/NavigationService';

export function* getProducts() {
  // console.log(JSON.stringify(payload))
  // console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(MarketService.getProducts);
  if (response.status === 200) {
    yield put(MarketActions.getProductsSuccess(response.data.message));
  } else {
    yield put(MarketActions.getProductsFailure('S** happened'));
  }
}

export function* storeProduct() {

  yield call(NavigationService.navigate, 'product');
  yield put(MarketActions.storeProductSuccess());
}

export function* handleLike(payload) {
  console.log(payload);
  const response = yield call(MarketService.handleLike, payload.payload);
  if (response.status === 200) {
    yield put(MarketActions.handleLikeSuccess(response.data));
  } else {
    yield put(MarketActions.handleLikeFailure('S** happened'));
  }
}

export function* createOrder(payload) {
  const response = yield call(MarketService.createOrder, payload.payload);
  if (response.status === 200) {
    console.log(response);
    yield put(MarketActions.createOrderSuccess(response.data));
  } else {
    yield put(MarketActions.createOrderFailure('S** happened'));
  }
}

export function* getOrders(payload) {
  const response = yield call(MarketService.getOrders, payload);
  if (response.status === 200) {
    console.log(response);
    yield put(MarketActions.getOrdersSuccess(response.data.message));
  } else {
    yield put(MarketActions.getOrdersFailure('S** happened'));
  }
}

export function* updateOrder(payload) {
  console.log(payload)
  const response = yield call(MarketService.updateOrder, {id: payload.payload, status: "done"});
  console.log(response);
  if (response.status === 200) {
    yield put(MarketActions.updateOrderSuccess(response.data));
  } else {
    yield put(MarketActions.updateOrderFailure('S** happened'));
  }
}
// uid, username, fcmToken
