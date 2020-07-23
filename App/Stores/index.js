import {combineReducers} from 'redux';
import {configureStore} from './createStore';
import rootSaga from '../Sagas';
import {reducer as authReducer} from './Auth/Reducers';
import {reducer as claimReducer} from './Claim/Reducers';

export default () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    claim: claimReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
