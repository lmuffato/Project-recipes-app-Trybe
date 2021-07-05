import { CHANGE_DRINK_CATEGORY,
  FINISHED_LOADING_DRINK_CATEGORIES,
  FINISHED_LOADING_DRINK_RECIPES,
  LOADING_DRINK_CATEGORIES,
  LOADING_DRINK_CATEGORIES_FAILED,
  LOADING_DRINK_RECIPES,
  LOADING_DRINK_RECIPES_FAILED,
  SET_DRINKS,
  SET_DRINK_CATEGORIES } from '../actions/drinksAction';

const INITIAL_STATE = {
  loadingRecipes: false,
  loadingCategories: false,
  loadingRecipesError: null,
  loadingCategoriesError: null,
  recipes: [],
  categories: [],
  selectedCategory: 'All',
};

export default function drinksReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_DRINK_RECIPES:
    return { ...state,
      loadingRecipes: true };
  case FINISHED_LOADING_DRINK_RECIPES:
    return { ...state,
      loadingRecipes: false };
  case LOADING_DRINK_RECIPES_FAILED:
    return { ...state,
      loadingRecipes: false,
      loadingRecipesError: action.payload.message };
  case SET_DRINKS:
    return { ...state, recipes: action.payload };
  case LOADING_DRINK_CATEGORIES:
    return { ...state,
      loadingCategories: true };
  case FINISHED_LOADING_DRINK_CATEGORIES:
    return { ...state,
      loadingCategories: false };
  case LOADING_DRINK_CATEGORIES_FAILED:
    return { ...state,
      loadingCategories: false,
      loadingCategoriesError: action.payload.message };
  case SET_DRINK_CATEGORIES:
    return { ...state, categories: action.payload };
  case CHANGE_DRINK_CATEGORY:
    return { ...state, selectedCategory: action.payload };
  default:
    return state;
  }
}
