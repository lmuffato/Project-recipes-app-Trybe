import { combineReducers } from 'redux';
import userReducer from './userReducer';
import searchReducer from './searchReducer';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
  userReducer, searchReducer, detailsReducer,
});

export default rootReducer;
