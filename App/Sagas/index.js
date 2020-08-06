import {takeLatest, all} from 'redux-saga/effects';

import {AuthTypes} from '../Stores/Auth/Actions';
import {MarketTypes} from '../Stores/Market/Actions';

import {getProfile} from './AuthSaga';

import { getProducts, handleLike } from './MarketSaga';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts

    takeLatest(AuthTypes.GET_PROFILE_REQUEST, getProfile),

    takeLatest(MarketTypes.GET_PRODUCTS_REQUEST, getProducts),
    takeLatest(MarketTypes.HANDLE_LIKE_REQUEST, handleLike),
    
  ]);
}
