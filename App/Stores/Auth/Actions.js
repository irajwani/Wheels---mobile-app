import {createActions} from 'reduxsauce';

const {Types, Creators} = createActions({
  createUserRequest: ['newUser'],
  createUserSuccess: ['registerStatus'],
  createUserFailure: ['errorMessage'],

  getProfileRequest: ['uid'],
  getProfileSuccess: ['message'],
  getProfileFailure: ['errorMessage'],

  updateUserRequest: ['update'],
  updateUserSuccess: ['message'],
  updateUserFailure: ['errorMessage'],

  addPhotographRequest: ['body'],
  addPhotographSuccess: ['message'],
  addPhotographFailure: ['errorMessage'],

  getGalleryRequest: ['body'],
  getGallerySuccess: ['message'],
  getGalleryFailure: ['errorMessage'],

  addToJournalRequest: ['body'],
  addToJournalSuccess: ['message'],
  addToJournalFailure: ['errorMessage'],

  storeUid: ['uid'],
});

export const AuthTypes = Types;
export default Creators;