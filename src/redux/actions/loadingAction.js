export const LOADING_RECIPES = 'LOADING_RECIPES';
export const FINISHED_LOADING_RECIPES = 'FINISHED_LOADING_RECIPES';
export const LOADING_RECIPES_FAILED = 'LOADING_RECIPES_FAILED';
export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const FINISHED_LOADING_CATEGORIES = 'FINISHED_LOADING_CATEGORIES';
export const LOADING_CATEGORIES_FAILED = 'LOADING_CATEGORIES_FAILED';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

export function loadingRecipes() {
  return {
    type: LOADING_RECIPES,
  };
}
export function finishedLoadingRecipes(payload) {
  return {
    type: FINISHED_LOADING_RECIPES,
    payload,
  };
}
export function loadingRecipesFailed(payload) {
  return {
    type: LOADING_RECIPES_FAILED,
    payload,
  };
}

export function loadingCategories() {
  return {
    type: LOADING_CATEGORIES,
  };
}
export function finishedLoadingCategories(payload) {
  return {
    type: FINISHED_LOADING_CATEGORIES,
    payload,
  };
}
export function loadingCategoriesFailed(payload) {
  return {
    type: LOADING_CATEGORIES_FAILED,
    payload,
  };
}
