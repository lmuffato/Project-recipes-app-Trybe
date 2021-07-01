import { CHANGE_MEAL_CATEGORY,
  FINISHED_LOADING_MEAL_CATEGORIES,
  FINISHED_LOADING_MEAL_RECIPES,
  LOADING_MEAL_CATEGORIES,
  LOADING_MEAL_CATEGORIES_FAILED,
  LOADING_MEAL_RECIPES,
  LOADING_MEAL_RECIPES_FAILED,
  SET_MEALS,
  SET_MEAL_CATEGORIES } from '../actions/mealsAction';

const INITIAL_STATE = {
  loadingRecipes: false,
  loadingCategories: false,
  loadingRecipesError: null,
  loadingCategoriesError: null,
  recipes: [],
  categories: [],
  selectedCategory: 'All',
};

export default function mealsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_MEAL_RECIPES:
    return { ...state,
      loadingRecipes: true };
  case FINISHED_LOADING_MEAL_RECIPES:
    return { ...state,
      loadingRecipes: false };
  case LOADING_MEAL_RECIPES_FAILED:
    return { ...state,
      loadingRecipes: false,
      loadingRecipesError: action.payload.message };
  case SET_MEALS:
    return { ...state, recipes: action.payload };
  case LOADING_MEAL_CATEGORIES:
    return { ...state,
      loadingCategories: true };
  case FINISHED_LOADING_MEAL_CATEGORIES:
    return { ...state,
      loadingCategories: false };
  case LOADING_MEAL_CATEGORIES_FAILED:
    return { ...state,
      loadingCategories: false,
      loadingCategoriesError: action.payload.message };
  case SET_MEAL_CATEGORIES:
    return { ...state, categories: action.payload };
  case CHANGE_MEAL_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  default:
    return state;
  }
}
