import fetchDrinks,
{ fetchMealSearched, fetchSpecificDrink } from '../services/fetchDrinks';
import { fetchDrinksCategories } from '../services/fetchCategories';

export const API_DRINK_FETCH = 'API_DRINK_FETCH';
export const STORE_DRINKS = 'STORE_DRINKS';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';
export const SET_DRINKS_FILTER = 'SET_DRINKS_FILTER';
export const SPECIFIC_DRINK = 'SPECIFIC_DRINK';

export const apiFetch = () => ({ type: API_DRINK_FETCH });

export const storeCategories = (payload) => ({ type: STORE_CATEGORIES, payload });

export const storeDrinks = (payload) => ({ type: STORE_DRINKS, payload });

export const setDrinksFilter = (payload) => ({ type: SET_DRINKS_FILTER, payload });

export const storeSpecificDrink = (payload) => ({ type: SPECIFIC_DRINK, payload });

export function getDrinksCategories() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const categories = await fetchDrinksCategories();
    dispatch(storeCategories(categories));
  };
}

export function getDrinks(filter) {
  return async (dispatch) => {
    dispatch(apiFetch());
    const drinks = await fetchDrinks(filter);
    dispatch(storeDrinks(drinks));
  };
}

export function searchDrink(text, option) {
  return async (dispatch) => {
    dispatch(apiFetch());
    const meals = await fetchMealSearched(text, option);
    dispatch(storeDrinks(meals));
  };
}

export function getSpecificDrink(id) {
  return async (dispatch) => {
    dispatch(apiFetch());
    const drink = await fetchSpecificDrink(id);
    dispatch(storeSpecificDrink(drink));
  };
}
