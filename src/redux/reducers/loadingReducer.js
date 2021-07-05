import { LOADING_RECIPES,
  FINISHED_LOADING_RECIPES,
  LOADING_RECIPES_FAILED,
  LOADING_CATEGORIES,
  FINISHED_LOADING_CATEGORIES,
  LOADING_CATEGORIES_FAILED } from '../actions/loadingAction';

const INITIAL_STATE = {
  loadingRecipes: false,
  loadingCategories: false,
  loadingRecipesError: null,
  loadingCategoriesError: null,
  requestedURL: null,
};

export default function loadingReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_RECIPES:
    return { ...state,
      loadingRecipes: true,
      requestedURL: action.payload };
  case FINISHED_LOADING_RECIPES:
    return { ...state,
      loadingRecipes: false };
  case LOADING_RECIPES_FAILED:
    return { ...state,
      loadingRecipes: false,
      loadingRecipesError: action.payload.message };
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
  default:
    return state;
  }
}
