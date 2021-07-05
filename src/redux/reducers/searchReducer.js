import {
  ACTION_SEARCH, ACTION_MAIN_FOOD_LIST, ACTION_MAIN_DRINK,
  ACTION_LOADING, ACTION_DRINKS_CATEGORY, ACTION_FOOD_CATEGORY,
} from '../actions';

const INITIAL_STATE = {
  data: '',
  item: '',
  initialMeals: [],
  initialDrinks: [],
  isLoading: false,
  drinksCategory: [],
  mealsCategory: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOADING:
    return {
      ...state,
      isLoading: true,
    };
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
      isLoading: false,
    };
  case ACTION_MAIN_DRINK:
    return {
      ...state,
      initialDrinks: action.drinksList,
      isLoading: false,
    };
  case ACTION_DRINKS_CATEGORY:
    return {
      ...state,
      drinksCategory: action.drinksCategories,
    };
  case ACTION_FOOD_CATEGORY:
    console.log(action.foodCategories);
    return {
      ...state,
      mealsCategory: action.foodCategories,
    };
  default:
    return state;
  }
};

export default searchReducer;
