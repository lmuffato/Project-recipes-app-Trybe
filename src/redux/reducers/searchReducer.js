import { ACTION_SEARCH, ACTION_MAIN_FOOD_LIST, ACTION_MAIN_DRINK } from '../actions';

const INITIAL_STATE = {
  data: '',
  item: '',
  initialMeals: [],
  initialDrinks: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_SEARCH:
    return {
      ...state,
      data: action.data,
      item: action.item,
    };
  case ACTION_MAIN_FOOD_LIST:
    return {
      ...state,
      initialMeals: action.mealsList,
    };
  case ACTION_MAIN_DRINK:
    return {
      ...state,
      initialDrinks: action.drinksList,
    };
  default:
    return state;
  }
};

export default searchReducer;
