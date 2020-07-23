import {put, call} from 'redux-saga/effects';
import {AsyncStorage} from 'react-native';
import ClaimActions from '../Stores/Claim/Actions';
import ClaimService from '../Services/ClaimService';

export function* createClaim(payload) {
  // console.log('Sending new user data to server');
  // console.log(newUser);
  const response = yield call(ClaimService.createClaim, payload.payload);
  // console.log(response);
  if (response.status === 200) {
    let {data} = response.data;
    yield put(ClaimActions.createClaimSuccess(data));
  } else {
    yield put(ClaimActions.createUserFailure('S** happened'));
  }
}

export function* getClaims(payload) {
  // console.log(JSON.stringify(payload))
  // console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(ClaimService.getClaims, payload);

  if (response.status === 200) {
    yield put(ClaimActions.getClaimsSuccess(response.data));
  } else {
    yield put(ClaimActions.getClaimsFailure('S** happened'));
  }
}

// uid, username, fcmToken
