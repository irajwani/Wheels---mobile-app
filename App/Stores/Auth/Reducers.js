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

export const logOut = (state) => ({
  ...state,
  uid: '',
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




export const reducer = createReducer(INITIAL_STATE, {
  [AuthTypes.CREATE_USER_REQUEST]: createUserRequest,
  [AuthTypes.CREATE_USER_SUCCESS]: createUserSuccess,
  [AuthTypes.CREATE_USER_FAILURE]: createUserFailure,

  [AuthTypes.GET_PROFILE_REQUEST]: getProfileRequest,
  [AuthTypes.GET_PROFILE_FAILURE]: getProfileFailure,
  [AuthTypes.GET_PROFILE_SUCCESS]: getProfileSuccess,
  
  [AuthTypes.STORE_UID]: storeUid,
  [AuthTypes.LOG_OUT]: logOut,

  [AuthTypes.UPDATE_USER_REQUEST]: updateUserRequest,
  [AuthTypes.UPDATE_USER_SUCCESS]: updateUserSuccess,
  [AuthTypes.UPDATE_USER_FAILURE]: updateUserFailure,

})




// profile: {
//   ...state.profile,
//   profile: {
//     ...state.profile.profile,
//     gallery: message,
//   }
// },
