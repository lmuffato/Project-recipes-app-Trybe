import { combineReducers } from 'redux';
import user from './user';

const rootReducers = combineReducers({
  user,
  // food,
});

export default rootReducers;
