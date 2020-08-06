import {combineReducers} from 'redux';
import {configureStore} from './createStore';
import rootSaga from '../Sagas';
import {reducer as authReducer} from './Auth/Reducers';
import {reducer as marketReducer} from './Market/Reducers';

export default () => {
  const rootReducer = combineReducers({
    auth: authReducer,
    market: marketReducer,
  });

  return configureStore(rootReducer, rootSaga);
};
