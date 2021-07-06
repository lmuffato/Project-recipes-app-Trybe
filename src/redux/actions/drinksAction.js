import { DRINKS_ALL_CATEGORIES_ENDPOINT } from '../../services/drinks';
import fetchAPI from '../../services';
import {
  finishedLoadingCategories,
  finishedLoadingRecipes,
  loadingCategories,
  loadingCategoriesFailed,
  loadingRecipes,
  loadingRecipesFailed } from './loadingAction';

export const SET_DRINKS = 'SET_DRINKS';
export const SET_SEARCH_BAR_DRINKS = 'SET_SEARCH_BAR_DRINKS';
export const SET_DRINK_DETAILS = 'SET_DRINK_DETAILS';
export const SET_DRINK_CATEGORIES = 'SET_DRINK_CATEGORIES';
export const CHANGE_DRINK_CATEGORY = 'CHANGE_DRINK_CATEGORY';

function APIThunk(setter) {
  return (URL) => async (dispatch) => {
    dispatch(loadingRecipes(URL));
    try {
      const response = await fetchAPI(URL);
      dispatch(setter(response.drinks));
    } catch (e) {
      console.error(e);
      dispatch(loadingRecipesFailed(e));
    }
    dispatch(finishedLoadingRecipes());
  };
}
function setDrinks(payload) {
  return {
    type: SET_DRINKS,
    payload,
  };
}
function setSearchBarDrinks(payload) {
  return {
    type: SET_SEARCH_BAR_DRINKS,
    payload,
  };
}
function setDrinkDetails(payload) {
  return {
    type: SET_DRINK_DETAILS,
    payload,
  };
}
export const getDrinkRecipesAPIThunk = APIThunk(setDrinks);
export const getDrinkSearchBarAPIThunk = APIThunk(setSearchBarDrinks);
export const getDrinkDetailsAPIThunk = APIThunk(setDrinkDetails);

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
