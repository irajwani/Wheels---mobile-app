import { put, call } from 'redux-saga/effects'
import { AsyncStorage } from 'react-native'
import ContactActions from '../Stores/Contact/Actions'
import contactService from '../Services/ContactService'
import NavigationService from '../Services/NavigationService'

export function* sendMessage(payload) {
  console.log(payload);
  // console.log('Initiate profile retrieval for ' + JSON.stringify(payload));
  const response = yield call(contactService.sendMessage, payload.body)
  
  console.log(response);
  if (response.status === 200) {
    let {data} = response;
    yield put(ContactActions.sendMessageSuccess(data));
  } else {
    yield put(ContactActions.sendMessageFailure('S** happened'));
  }
}