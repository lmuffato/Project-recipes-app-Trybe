import { combineReducers } from 'redux';
import user from './user';
import meals from './meals';
import drinks from './drinks';

const rootReducer = combineReducers({
  user,
  meals,
  drinks,
});

export default rootReducer;
