import { DRINKS_ALL_CATEGORIES_ENDPOINT } from '../../services/drinks';
import fetchAPI from '../../services';

export const LOADING_DRINK_RECIPES = 'LOADING_DRINK_RECIPES';
export const FINISHED_LOADING_DRINK_RECIPES = 'FINISHED_LOADING_DRINK_RECIPES';
export const LOADING_DRINK_RECIPES_FAILED = 'LOADING_DRINK_RECIPES_FAILED';
export const SET_DRINKS = 'SET_DRINKS';
export const LOADING_DRINK_CATEGORIES = 'LOADING_DRINK_CATEGORIES';
export const FINISHED_LOADING_DRINK_CATEGORIES = 'FINISHED_LOADING_DRINK_CATEGORIES';
export const LOADING_DRINK_CATEGORIES_FAILED = 'LOADING_DRINK_CATEGORIES_FAILED';
export const SET_DRINK_CATEGORIES = 'SET_DRINK_CATEGORIES';
export const CHANGE_DRINK_CATEGORY = 'CHANGE_DRINK_CATEGORY';

function loadingRecipes() {
  return {
    type: LOADING_DRINK_RECIPES,
  };
}
function finishedLoadingRecipes(payload) {
  return {
    type: FINISHED_LOADING_DRINK_RECIPES,
    payload,
  };
}
function loadingRecipesFailed(payload) {
  return {
    type: LOADING_DRINK_RECIPES_FAILED,
    payload,
  };
}
function setMeals(payload) {
  return {
    type: SET_DRINKS,
    payload,
  };
}
export function getDrinkRecipesAPIThunk(URL) {
  const LAST_DRINK_INDEX = 12;
  const onlyTheFirst12 = (_recipe, index) => index < LAST_DRINK_INDEX;
  return async (dispatch) => {
    dispatch(loadingRecipes());
    try {
      const response = await fetchAPI(URL);
      dispatch(setMeals(response.drinks.filter(onlyTheFirst12)));
    } catch (e) {
      console.error(e);
      dispatch(loadingRecipesFailed(e));
    }
    dispatch(finishedLoadingRecipes());
  };
}

function loadingCategories() {
  return {
    type: LOADING_DRINK_CATEGORIES,
  };
}
function finishedLoadingCategories(payload) {
  return {
    type: FINISHED_LOADING_DRINK_CATEGORIES,
    payload,
  };
}
function loadingCategoriesFailed(payload) {
  return {
    type: LOADING_DRINK_CATEGORIES_FAILED,
    payload,
  };
}
function setCategories(payload) {
  return {
    type: SET_DRINK_CATEGORIES,
    payload,
  };
}
export function getDrinkCategoriesAPIThunk() {
  const LAST_CATEGORY_INDEX = 5;
  const onlyTheFirst5 = (_recipe, index) => index < LAST_CATEGORY_INDEX;
  return async (dispatch) => {
    dispatch(loadingCategories());
    try {
      const response = await fetchAPI(DRINKS_ALL_CATEGORIES_ENDPOINT);
      dispatch(setCategories(response.drinks.filter(onlyTheFirst5)));
    } catch (e) {
      console.error(e);
      dispatch(loadingCategoriesFailed(e));
    }
    dispatch(finishedLoadingCategories());
  };
}

export function changeCategory(payload) {
  return {
    type: CHANGE_DRINK_CATEGORY,
    payload,
  };
}
