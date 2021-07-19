export const LOADING_RECIPES = 'LOADING_RECIPES';
export const FINISHED_LOADING_RECIPES = 'FINISHED_LOADING_RECIPES';
export const LOADING_RECIPES_FAILED = 'LOADING_RECIPES_FAILED';
export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const FINISHED_LOADING_CATEGORIES = 'FINISHED_LOADING_CATEGORIES';
export const LOADING_CATEGORIES_FAILED = 'LOADING_CATEGORIES_FAILED';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';
export const LOADING_INGREDIENT = 'LOADING_INGREDIENT';
export const LOADING_INGREDIENT_FAIL = 'LOADING_INGREDIENT_FAIL';
export const FINISH_LOADING_INGREDIENTS = 'FINISH_LOADING_INGREDIENTS';
export const LOADING_AREAS = 'LOADING_AREAS';
export const FINISHED_LOADING_AREAS = 'FINISHED_LOADING_AREAS';
export const LOADING_AREAS_FAILED = 'LOADING_AREAS_FAILED';

export function loadingRecipes(payload) {
  return {
    type: LOADING_RECIPES,
    payload,
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

export function loadingIngredient() {
  return {
    type: LOADING_INGREDIENT,
  };
}
export function loadingIngredientsFailed(payload) {
  return {
    type: LOADING_INGREDIENT_FAIL,
    payload,
  };
}
export function finishedLoadingIngredients() {
  return {
    type: FINISH_LOADING_INGREDIENTS,
  };
}
export function loadingAreas() {
  return {
    type: LOADING_AREAS,
  };
}
export function finishedLoadingAreas(payload) {
  return {
    type: FINISHED_LOADING_AREAS,
    payload,
  };
}
export function loadingAreasFailed(payload) {
  return {
    type: LOADING_AREAS_FAILED,
    payload,
  };
}
