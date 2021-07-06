import { CHANGE_MEAL_CATEGORY,
  SET_MEALS,
  SET_MEAL_CATEGORIES,
  SET_MEAL_DETAILS } from '../actions/mealsAction';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  mealDetails: [],
  selectedCategory: 'All',
};

export default function mealsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_MEALS:
    return { ...state, recipes: action.payload };
  case SET_MEAL_CATEGORIES:
    return { ...state, categories: action.payload };
  case SET_MEAL_DETAILS:
    return { ...state, mealDetails: action.payload };
  case CHANGE_MEAL_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  default:
    return state;
  }
}
