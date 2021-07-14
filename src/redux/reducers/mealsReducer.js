import {
  CHANGE_MEAL_AREA,
  CHANGE_MEAL_CATEGORY,
  SET_MEALS,
  SET_MEAL_AREAS,
  SET_MEAL_CATEGORIES,
  SET_MEAL_DETAILS,
  SET_MEALS_INGREDIENTS } from '../actions/mealsAction';

const INITIAL_STATE = {
  recipes: [],
  mealDetails: [],
  ingredients: [],
  categories: [],
  selectedCategory: 'All',
  areas: [],
  selectedArea: 'All',
};

export default function mealsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_MEALS:
    return { ...state, recipes: action.payload };
  case SET_MEAL_DETAILS:
    return { ...state, mealDetails: action.payload };
  case SET_MEAL_CATEGORIES:
    return { ...state, categories: action.payload };
  case CHANGE_MEAL_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  case SET_MEALS_INGREDIENTS:
    return { ...state, ingredients: action.payload };
  case SET_MEAL_AREAS:
    return { ...state, areas: action.payload };
  case CHANGE_MEAL_AREA:
    return { ...state, selectedArea: action.payload };
  default:
    return state;
  }
}
