import { FINISHED_LOADING_CATEGORIES, FINISHED_LOADING_RECIPES,
  LOADING_CATEGORIES, LOADING_CATEGORIES_FAILED,
  LOADING_RECIPES, LOADING_RECIPES_FAILED,
  SET_CATEGORIES, SET_MEALS, CHANGE_CATEGORY } from '../actions/mealsAction';

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
  case LOADING_RECIPES:
    return { ...state,
      loadingRecipes: true };
  case FINISHED_LOADING_RECIPES:
    return { ...state,
      loadingRecipes: false };
  case LOADING_RECIPES_FAILED:
    return { ...state,
      loadingRecipes: false,
      loadingRecipesError: action.payload.message };
  case SET_MEALS:
    return { ...state, recipes: action.payload };
  case LOADING_CATEGORIES:
    return { ...state,
      loadingCategories: true };
  case FINISHED_LOADING_CATEGORIES:
    return { ...state,
      loadingCategories: false };
  case LOADING_CATEGORIES_FAILED:
    return { ...state,
      loadingCategories: false,
      loadingCategoriesError: action.payload.message };
  case SET_CATEGORIES:
    return { ...state, categories: action.payload };
  case CHANGE_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  default:
    return state;
  }
}
