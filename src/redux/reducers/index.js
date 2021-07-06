import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import user from './user';
import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  user,
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
