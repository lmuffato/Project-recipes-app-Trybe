import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import drinksReducer from './drinksMainPageReducer';
import mealsReducer from './mealsMainPageReducer';
import mealsSearchBarReducer from './mealsSearchBarReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  meals: mealsReducer,
  drinks: drinksReducer,
  mealsSearchBar: mealsSearchBarReducer,
});

export default rootReducer;
