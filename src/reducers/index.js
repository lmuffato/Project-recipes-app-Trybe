import { combineReducers } from 'redux';
import user from './user';
import meals from './meals';

const rootReducer = combineReducers({
  user,
  meals,
});

export default rootReducer;
