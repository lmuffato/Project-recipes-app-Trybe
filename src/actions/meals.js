import { fetchMealsCategories } from '../services/fetchCategories';
import fetchMeals from '../services/fetchMeals';

export const API_FETCH = 'API_FETCH';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';
export const STORE_MEALS = 'STORE_MEALS';

export const apiFetch = () => ({ type: API_FETCH });

export const storeCategories = (payload) => ({ type: STORE_CATEGORIES, payload });

export const storeMeals = (payload) => ({ type: STORE_MEALS, payload });

export function getMealsCategories() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const categories = await fetchMealsCategories();
    dispatch(storeCategories(categories));
  };
}

export function getMeals() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const meals = await fetchMeals();
    dispatch(storeMeals(meals));
  };
}
