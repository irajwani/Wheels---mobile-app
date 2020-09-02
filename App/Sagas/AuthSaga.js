import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import AuthActions from '../Stores/Auth/Actions'
import authService from '../Services/AuthService'
import NavigationService from '../Services/NavigationService'

export function* createUser(payload) {
  console.log('Sending new user data to server');
  let {newUser} = payload;
  console.log(newUser);
  const response = yield call(authService.createProfile, newUser)
  console.log(response);
  if (response.status === 200) {
    
    let {data} = response.data;
    yield call(AuthActions.storeUid, data.uid);
    yield put(AuthActions.getProfileSuccess(data));
    yield put(AuthActions.createUserSuccess());
    yield call(NavigationService.navigate, 'AppStack');
  } else {
    yield put(AuthActions.createUserFailure('S** happened'));
  }
  
}






export function* getProfile(payload) {
  // console.log(JSON.stringify(payload))
  // console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(authService.getProfile, payload)
  console.log(response);
  if (response.status === 200) {
    yield put(AuthActions.getProfileSuccess(response.data))
  } else {
    yield put(AuthActions.getProfileFailure('S** happened'))
  }
}

export function* updateUser(payload) {
  console.log('updating user');
  const {update} = payload;
  
  const response = yield call(authService.updateUser, update);
  console.log(response);
  if (response.status === 200) {
    
    // yield put(AuthActions.getProfileSuccess(response.data.data));
    yield put(AuthActions.updateUserSuccess(response.data));
    // yield call(NavigationService.navigate, 'Wallet');
    
  } else {
    yield put(AuthActions.updateUserFailure('S** happened'));
  }
  
}






export function* addPhotograph(payload) {
  console.log(payload);
  console.log('Initiate handleGallery with: ' + JSON.stringify(payload));
  const response = yield call(authService.addPhotograph, payload.body)
  
  console.log(response);
  if (response.status === 200) {
    yield put(AuthActions.addPhotographSuccess());
  } else {
    yield put(AuthActions.addPhotographFailure('S** happened'))
  }
}





export function* getGallery(payload) {
  console.log('Initiate gallery retrieval with: ' + JSON.stringify(payload));
  const response = yield call(authService.getGallery, payload.body)
  
  console.log(response);
  if (response.status === 200) {
    let {data} = response;
    yield put(AuthActions.getGallerySuccess(data.message));
  } else {
    yield put(AuthActions.getGalleryFailure('S** happened'))
  }
}
 





export function* addToJournal(payload) {
  console.log(payload);
  // console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(authService.addToJournal, payload.body)
  
  console.log(response);
  if (response.status === 200) {
    let {data} = response;
    yield put(AuthActions.addToJournalSuccess(data));
  } else {
    yield put(AuthActions.addToJournalFailure('S** happened'));
  }
}

// uid, username, fcmToken