import { CHANGE_DRINK_CATEGORY,
  SET_DRINKS,
  SET_DRINK_CATEGORIES,
  SET_DRINK_DETAILS,
  SET_DRINKS_INGREDIENTS } from '../actions/drinksAction';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  drinkDetails: [],
  ingredients: [],
  selectedCategory: 'All',
};

export default function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_DRINKS:
    return { ...state, recipes: action.payload };
  case SET_DRINK_CATEGORIES:
    return { ...state, categories: action.payload };
  case SET_DRINK_DETAILS:
    return { ...state, drinkDetails: action.payload };
  case CHANGE_DRINK_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  case SET_DRINKS_INGREDIENTS:
    return { ...state, ingredients: action.payload };
  default:
    return state;
  }
}
