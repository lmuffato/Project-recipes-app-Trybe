import { combineReducers } from 'redux';

import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';
import mealsSearchBarReducer from './mealsSearchBarReducer';

const rootReducer = combineReducers({
  meals: mealsReducer,
  drinks: drinksReducer,
  mealsSearchBar: mealsSearchBarReducer,
});

export default rootReducer;
