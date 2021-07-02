import { MEALS_ALL_CATEGORIES_ENDPOINT } from '../../services/meals';
import fetchAPI from '../../services';
import {
  finishedLoadingCategories,
  finishedLoadingRecipes,
  loadingCategories,
  loadingCategoriesFailed,
  loadingRecipes,
  loadingRecipesFailed } from './loadingAction';

export const SET_MEALS = 'SET_MEALS';
export const SET_SEARCH_BAR_MEALS = 'SET_SEARCH_BAR_MEALS';
export const SET_MEAL_CATEGORIES = 'SET_MEAL_CATEGORIES';
export const CHANGE_MEAL_CATEGORY = 'CHANGE_MEAL_CATEGORY';

function APIThunk(setter) {
  return (URL) => async (dispatch) => {
    dispatch(loadingRecipes());
    try {
      const response = await fetchAPI(URL);
      dispatch(setter(response.meals));
    } catch (e) {
      console.error(e);
      dispatch(loadingRecipesFailed(e));
    }
    dispatch(finishedLoadingRecipes());
  };
}
function setMeals(payload) {
  return {
    type: SET_MEALS,
    payload,
  };
}
function setSearchBarMeals(payload) {
  return {
    type: SET_SEARCH_BAR_MEALS,
    payload,
  };
}
export const getFoodRecipesAPIThunk = APIThunk(setMeals);
export const getFoodSearchBarAPIThunk = APIThunk(setSearchBarMeals);

function setCategories(payload) {
  return {
    type: SET_MEAL_CATEGORIES,
    payload,
  };
}
export function getFoodCategoriesAPIThunk() {
  const LAST_CATEGORY_INDEX = 5;
  const onlyTheFirst5 = (_recipe, index) => index < LAST_CATEGORY_INDEX;
  return async (dispatch) => {
    dispatch(loadingCategories());
    try {
      const response = await fetchAPI(MEALS_ALL_CATEGORIES_ENDPOINT);
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
    type: CHANGE_MEAL_CATEGORY,
    payload,
  };
}
