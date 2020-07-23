import { INITIAL_STATE } from './InitialState'
import { createReducer } from 'reduxsauce'
import { ListingTypes } from './Actions'

export const createListingRequest = (state) => ({
  ...state,
  isLoading: true,
  addStatus: 'running'

})

export const createListingSuccess = (state, {message}) => ({
  ...state,
  message,
  isLoading: false,
  addStatus: 'idle'
  
})

export const createListingFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  isLoading: false,
  addStatus: 'idle'
})

export const getUsersRequest = (state) => ({
    ...state,
    isLoading: true,
  })
  
export const getUsersSuccess = (state, {message}) => {
  
  return {
    ...state,
    users: message.data,
    isLoading: false,
  }
}

export const getUsersFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  isLoading: false
})

export const createPostRequest = (state) => ({
  ...state,
  isLoading: true,
  postStatus: 'running'

})

export const createPostSuccess = (state, {message}) => {
  
  return {
    ...state,
    isLoading: false,
    postStatus: 'idle',
    newPost: message
  }
}

export const createPostFailure = (state, { errorMessage }) => ({
  ...state,
  errorMessage,
  isLoading: false,
  postStatus: 'idle'
})
  



export const reducer = createReducer(INITIAL_STATE, {

  [ListingTypes.CREATE_LISTING_REQUEST]: createListingRequest,
  [ListingTypes.CREATE_LISTING_SUCCESS]: createListingSuccess,
  [ListingTypes.CREATE_LISTING_FAILURE]: createListingFailure,

  [ListingTypes.GET_USERS_REQUEST]: getUsersRequest,
  [ListingTypes.GET_USERS_SUCCESS]: getUsersSuccess,
  [ListingTypes.GET_USERS_FAILURE]: getUsersFailure,

  [ListingTypes.CREATE_POST_REQUEST]: createPostRequest,
  [ListingTypes.CREATE_POST_SUCCESS]: createPostSuccess,
  [ListingTypes.CREATE_POST_FAILURE]: createPostFailure,
  
})
