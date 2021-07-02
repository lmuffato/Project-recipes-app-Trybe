import { CHANGE_DRINK_CATEGORY,
  SET_DRINKS,
  SET_DRINK_CATEGORIES } from '../actions/drinksAction';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  selectedCategory: 'All',
};

export default function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_DRINKS:
    return { ...state, recipes: action.payload };
  case SET_DRINK_CATEGORIES:
    return { ...state, categories: action.payload };
  case CHANGE_DRINK_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  default:
    return state;
  }
}
