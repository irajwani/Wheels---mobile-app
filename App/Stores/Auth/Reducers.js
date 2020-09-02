import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { AuthTypes } from './Actions'

export const createUserRequest = (state) => ({
  ...state,
})

export const createUserSuccess = (state) => {
  return {
    ...state,
    registerStatus: true,
  }
}

export const createUserFailure = (state, {errorMessage}) => ({
  ...state,
  errorMessage,
})

export const storeUid = (state, {uid}) => ({
  ...state,
  uid,
})

export const getProfileRequest = (state) => {
  return {
    ...state,
    isLoading: true,
  }
}

export const getProfileSuccess = (state, {message}) => {
  console.log('PROFILE:', message);
  return {
    ...state,
    isLoading: false,
    profile: message,
  }
}

export const getProfileFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage,
})


export const updateUserRequest = (state) => ({
  ...state,
  isLoading: true,
  updateStatus: 'running',
})

export const updateUserSuccess = (state, {message}) => {
  console.log(message);
  return {
    ...state,
    isLoading: false,
    updateStatus: 'idle'
  }
}

export const updateUserFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  updateStatus: 'idle',
  errorMessage,
})

export const addPhotographRequest = (state) => ({
  ...state,
  isLoading: true,
  addStatus: 'running',
})

export const addPhotographSuccess = (state) => {
  return {
    ...state,
    isLoading: false,
    addStatus: 'idle',
  }
}

export const addPhotographFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  addStatus: 'idle',
  //so UI can be handled accordingly if need be
  errorMessage,
})

export const getGalleryRequest = (state) => {
  return {
    ...state,
    isLoading: true,
  }
}

export const getGallerySuccess = (state, {message}) => {
  state.profile.profile.gallery = message
  return {
    ...state,
    isLoading: false,

  }
}

export const getGalleryFailure = (state, { errorMessage }) => ({
  ...state,
  isLoading: false,
  errorMessage,
})


export const addToJournalRequest = (state) => ({
  ...state,
  isLoading: true,
  addStatus: 'running'
})

export const addToJournalSuccess = (state, {message}) => ({
  ...state,
  message,
  isLoading: false,
  addStatus: 'idle',
  
})

export const addToJournalFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  isLoading: false,
  addStatus: 'idle',
})




export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.CREATE_USER_REQUEST]: createUserRequest,
  [AuthTypes.CREATE_USER_SUCCESS]: createUserSuccess,
  [AuthTypes.CREATE_USER_FAILURE]: createUserFailure,

  [AuthTypes.GET_PROFILE_REQUEST]: getProfileRequest,
  [AuthTypes.GET_PROFILE_FAILURE]: getProfileFailure,
  [AuthTypes.GET_PROFILE_SUCCESS]: getProfileSuccess,
  
  [AuthTypes.STORE_UID]: storeUid,

  [AuthTypes.UPDATE_USER_REQUEST]: updateUserRequest,
  [AuthTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [AuthTypes.UPDATE_USER_FAILURE]: updateUserFailure,

  [AuthTypes.ADD_PHOTOGRAPH_REQUEST]: addPhotographRequest,
  [AuthTypes.ADD_PHOTOGRAPH_SUCCESS]: addPhotographSuccess,
  [AuthTypes.ADD_PHOTOGRAPH_FAILURE]: addPhotographFailure,


  [AuthTypes.GET_GALLERY_REQUEST]: getGalleryRequest,
  [AuthTypes.GET_GALLERY_SUCCESS]: getGallerySuccess,
  [AuthTypes.GET_GALLERY_FAILURE]: getGalleryFailure,

  [AuthTypes.ADD_TO_JOURNAL_REQUEST]: addToJournalRequest,
  [AuthTypes.ADD_TO_JOURNAL_SUCCESS]: addToJournalSuccess,
  [AuthTypes.ADD_TO_JOURNAL_FAILURE]: addToJournalFailure,
})




// profile: {
//   ...state.profile,
//   profile: {
//     ...state.profile.profile,
//     gallery: message,
//   }
// },
