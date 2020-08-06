import {put, call} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import MarketActions from '../Stores/Market/Actions';
import MarketService from '../Services/MarketService';

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


export function* handleLike(payload) {
  
  const response = yield call(MarketService.handleLike, payload.payload);
  if (response.status === 200) {
    yield put(MarketActions.handleLikeSuccess(response.data));
  } else {
    yield put(MarketActions.handleLikeFailure('S** happened'));
  }
}
// uid, username, fcmToken
