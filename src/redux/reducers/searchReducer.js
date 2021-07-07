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
  showDetails: true,
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_LOADING:
    return {
      ...state,
      isLoading: true,
    };
  case ACTION_SEARCH:
    console.log(action.item);
    return {
      ...state,
      data: action.data,
      item: action.item,
      showDetails: true,
    };
  case ACTION_MAIN_FOOD_LIST:
    return {
      ...state,
      initialMeals: action.mealsList,
      showDetails: action.showDetails,
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
    return {
      ...state,
      mealsCategory: action.foodCategories,
    };
  default:
    return state;
  }
};

export default searchReducer;
