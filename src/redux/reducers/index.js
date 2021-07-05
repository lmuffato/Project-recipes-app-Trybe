import { combineReducers } from 'redux';
import searchReducer from './searchReducer';
import detailsReducer from './detailsReducer';

const rootReducer = combineReducers({
  searchReducer,
  detailsReducer,
});

export default rootReducer;
