import { ALL_CATEGORIES_ENDPOINT, fetchAPI } from '../../services';

export const LOADING_RECIPES = 'LOADING_RECIPES';
export const FINISHED_LOADING_RECIPES = 'FINISHED_LOADING_RECIPES';
export const LOADING_RECIPES_FAILED = 'LOADING_RECIPES_FAILED';
export const SET_MEALS = 'SET_MEALS';
export const LOADING_CATEGORIES = 'LOADING_CATEGORIES';
export const FINISHED_LOADING_CATEGORIES = 'FINISHED_LOADING_CATEGORIES';
export const LOADING_CATEGORIES_FAILED = 'LOADING_CATEGORIES_FAILED';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const CHANGE_CATEGORY = 'CHANGE_CATEGORY';

function loadingRecipes() {
  return {
    type: LOADING_RECIPES,
  };
}
function finishedLoadingRecipes(payload) {
  return {
    type: FINISHED_LOADING_RECIPES,
    payload,
  };
}
function loadingRecipesFailed(payload) {
  return {
    type: LOADING_RECIPES_FAILED,
    payload,
  };
}
function setMeals(payload) {
  return {
    type: SET_MEALS,
    payload,
  };
}
export function getFoodRecipesAPIThunk(URL) {
  const LAST_FOOD_INDEX = 12;
  const onlyTheFirst12 = (_recipe, index) => index < LAST_FOOD_INDEX;
  return async (dispatch) => {
    dispatch(loadingRecipes());
    try {
      const response = await fetchAPI(URL);
      dispatch(setMeals(response.meals.filter(onlyTheFirst12)));
    } catch (e) {
      console.error(e);
      dispatch(loadingRecipesFailed(e));
    }
    dispatch(finishedLoadingRecipes());
  };
}

function loadingCategories() {
  return {
    type: LOADING_CATEGORIES,
  };
}
function finishedLoadingCategories(payload) {
  return {
    type: FINISHED_LOADING_CATEGORIES,
    payload,
  };
}
function loadingCategoriesFailed(payload) {
  return {
    type: LOADING_CATEGORIES_FAILED,
    payload,
  };
}
function setCategories(payload) {
  return {
    type: SET_CATEGORIES,
    payload,
  };
}
export function getFoodCategoriesAPIThunk() {
  const LAST_CATEGORY_INDEX = 5;
  const onlyTheFirst5 = (_recipe, index) => index < LAST_CATEGORY_INDEX;
  return async (dispatch) => {
    dispatch(loadingCategories());
    try {
      const response = await fetchAPI(ALL_CATEGORIES_ENDPOINT);
      dispatch(setCategories(response.meals.filter(onlyTheFirst5)));
    } catch (e) {
      console.error(e);
      dispatch(loadingCategoriesFailed(e));
    }
    dispatch(finishedLoadingCategories());
  };
}

export function changeCategory(payload) {
  return {
    type: CHANGE_CATEGORY,
    payload,
  };
}
