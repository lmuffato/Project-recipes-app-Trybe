import { combineReducers } from 'redux';
import user from './user';
import recipes from './recipes';

const rootReducer = combineReducers({
  user,
  recipes,
});

export default rootReducer;
