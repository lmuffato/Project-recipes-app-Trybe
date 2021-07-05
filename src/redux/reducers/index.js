import { combineReducers } from 'redux';
import user from './user';
import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  user,
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
