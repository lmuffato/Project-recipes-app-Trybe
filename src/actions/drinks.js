import fetchDrinks from '../services/fetchDrinks';
import { fetchDrinksCategories } from '../services/fetchCategories';

export const API_FETCH = 'API_FETCH';
export const STORE_DRINKS = 'STORE_DRINKS';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';

export const apiFetch = () => ({ type: API_FETCH });

export const storeCategories = (payload) => ({ type: STORE_CATEGORIES, payload });

export const storeDrinks = (payload) => ({ type: STORE_DRINKS, payload });

export function getDrinksCategories() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const categories = await fetchDrinksCategories();
    dispatch(storeCategories(categories));
  };
}

export function getDrinks() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const drinks = await fetchDrinks();
    dispatch(storeDrinks(drinks));
  };
}
