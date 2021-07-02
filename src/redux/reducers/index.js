import { combineReducers } from 'redux';

import loadingReducer from './loadingReducer';
import drinksReducer from './drinksReducer';
import mealsReducer from './mealsReducer';

const rootReducer = combineReducers({
  loading: loadingReducer,
  meals: mealsReducer,
  drinks: drinksReducer,
});

export default rootReducer;
