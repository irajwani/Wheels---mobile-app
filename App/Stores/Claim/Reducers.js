import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {ClaimTypes} from './Actions';

export const createClaimRequest = (state) => ({
  ...state,
  isLoading: true,
  addStatus: 'running',
});

export const createClaimSuccess = (state, {message}) => ({
  ...state,
  message,
  isLoading: false,
  addStatus: 'idle',
});

export const createClaimFailure = (state, {errorMessage}) => ({
  ...state,
  errorMessage,
  isLoading: false,
  addStatus: 'idle',
});

export const getClaimsRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const getClaimsSuccess = (state, {message}) => {
  return {
    ...state,
    claims: message.data,
    isLoading: false,
  };
};

export const getClaimsFailure = (state, {errorMessage}) => ({
  ...state,
  errorMessage,
  isLoading: false,
});

export const createPostRequest = (state) => ({
  ...state,
  isLoading: true,
  postStatus: 'running',
});

export const createPostSuccess = (state, {message}) => {
  return {
    ...state,
    isLoading: false,
    postStatus: 'idle',
    newPost: message,
  };
};

export const createPostFailure = (state, {errorMessage}) => ({
  ...state,
  errorMessage,
  isLoading: false,
  postStatus: 'idle',
});

export const reducer = createReducer(INITIAL_STATE, {
  [ClaimTypes.CREATE_CLAIM_REQUEST]: createClaimRequest,
  [ClaimTypes.CREATE_CLAIM_SUCCESS]: createClaimSuccess,
  [ClaimTypes.CREATE_CLAIM_FAILURE]: createClaimFailure,

  [ClaimTypes.GET_CLAIMS_REQUEST]: getClaimsRequest,
  [ClaimTypes.GET_CLAIMS_SUCCESS]: getClaimsSuccess,
  [ClaimTypes.GET_CLAIMS_FAILURE]: getClaimsFailure,
});
