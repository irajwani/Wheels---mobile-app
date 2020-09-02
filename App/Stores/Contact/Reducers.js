import {INITIAL_STATE} from './InitialState';
import {createReducer} from 'reduxsauce';
import {ContactTypes} from './Actions';

export const sendMessageRequest = (state) => ({
  ...state,
  isLoading: true,
});

export const sendMessageSuccess = (state, {message}) => {
  return {
    ...state,
    isLoading: false,
  };
};

export const sendMessageFailure = (state, {errorMessage}) => ({
  ...state,
  isLoading: false,
  errorMessage,
});

export const reducer = createReducer(INITIAL_STATE, {
  [ContactTypes.SEND_MESSAGE_REQUEST]: sendMessageRequest,
  [ContactTypes.SEND_MESSAGE_SUCCESS]: sendMessageSuccess,
  [ContactTypes.SEND_MESSAGE_FAILURE]: sendMessageFailure,
});
