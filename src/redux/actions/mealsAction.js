import { MEALS_ALL_CATEGORIES_ENDPOINT,
  MEALS_INGREDIENT_ENDPOINT,
  MEALS_ALL_AREAS_ENDPOINT } from '../../services/meals';

import fetchAPI from '../../services';
import {
  finishedLoadingAreas,
  finishedLoadingCategories,
  finishedLoadingIngredients,
  finishedLoadingRecipes,
  loadingAreas,
  loadingAreasFailed,
  loadingCategories,
  loadingCategoriesFailed,
  loadingIngredient,
  loadingIngredientsFailed,
  loadingRecipes,
  loadingRecipesFailed } from './loadingAction';

export const SET_MEALS = 'SET_MEALS';
export const SET_SEARCH_BAR_MEALS = 'SET_SEARCH_BAR_MEALS';
export const SET_MEAL_DETAILS = 'SET_MEAL_DETAILS';
export const SET_MEAL_CATEGORIES = 'SET_MEAL_CATEGORIES';
export const CHANGE_MEAL_CATEGORY = 'CHANGE_MEAL_CATEGORY';
export const SET_MEALS_INGREDIENTS = 'SET_MEALS_INGREDIENTS';
export const SET_MEAL_AREAS = 'SET_MEAL_AREAS';
export const CHANGE_MEAL_AREA = 'CHANGE_MEAL_AREA';

function APIThunk(setter) {
  return (URL) => async (dispatch) => {
    dispatch(loadingRecipes(URL));
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
function setMealDetails(payload) {
  return {
    type: SET_MEAL_DETAILS,
    payload,
  };
}
export const getFoodRecipesAPIThunk = APIThunk(setMeals);
export const getFoodSearchBarAPIThunk = APIThunk(setSearchBarMeals);
export const getFoodDetailsAPIThunk = APIThunk(setMealDetails);

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
function setAreas(payload) {
  return {
    type: SET_MEAL_AREAS,
    payload,
  };
}
export function getFoodAreasAPIThunk() {
  return async (dispatch) => {
    dispatch(loadingAreas());
    try {
      console.log(MEALS_ALL_AREAS_ENDPOINT);
      const response = await fetchAPI(MEALS_ALL_AREAS_ENDPOINT);
      dispatch(setAreas(response.meals));
    } catch (e) {
      console.error(e);
      dispatch(loadingAreasFailed(e));
    }
    dispatch(finishedLoadingAreas());
  };
}
export function changeCategory(payload) {
  return {
    type: CHANGE_MEAL_CATEGORY,
    payload,
  };
}
export function setIngredients(payload) {
  return {
    type: SET_MEALS_INGREDIENTS,
    payload,
  };
}
export function getMealsIngredientsAPIThunk() {
  const LAST_INGREDIENT_INDEX = 12;
  const onlyTheFirst12 = (_recipe, index) => index < LAST_INGREDIENT_INDEX;
  return async (dispatch) => {
    dispatch(loadingIngredient());
    try {
      const response = await fetchAPI(MEALS_INGREDIENT_ENDPOINT);
      dispatch(setIngredients(response.meals.filter(onlyTheFirst12)));
    } catch (e) {
      console.error(e);
      dispatch(loadingIngredientsFailed(e));
    }
    dispatch(finishedLoadingIngredients());
  };
}
export function changeArea(payload) {
  return {
    type: CHANGE_MEAL_AREA,
    payload,
  };
}
