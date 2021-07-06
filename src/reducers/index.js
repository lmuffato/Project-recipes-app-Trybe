import { combineReducers } from 'redux';
import user from './user';
import recipe from './recipe';

const rootReducers = combineReducers({
  user,
  recipe,
});

export default rootReducers;
