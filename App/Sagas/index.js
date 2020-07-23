import {takeLatest, all} from 'redux-saga/effects';

import {AuthTypes} from '../Stores/Auth/Actions';
import {ClaimTypes} from '../Stores/Claim/Actions';

import {getProfile} from './AuthSaga';
import {createClaim, getClaims} from './ClaimSaga';

export default function* root() {
  yield all([
    /**
     * @see https://redux-saga.js.org/docs/basics/UsingSagaHelpers.html
     */
    // Run the startup saga when the application starts

    takeLatest(AuthTypes.GET_PROFILE_REQUEST, getProfile),

    takeLatest(ClaimTypes.GET_CLAIMS_REQUEST, getClaims),
    takeLatest(ClaimTypes.CREATE_CLAIM_REQUEST, createClaim),
  ]);
}
