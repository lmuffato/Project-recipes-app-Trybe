import { combineReducers } from 'redux';
import user from './user';
// import food from './food';

const rootReducers = combineReducers({
  user,
  // food,
});

export default rootReducers;
