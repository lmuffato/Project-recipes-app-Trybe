import fetchDrinks from '../services/fetchDrinks';

export const API_FETCH = 'API_FETCH';
export const STORE_DRINKS = 'STORE_DRINKS';

export const apiFetch = () => ({ type: API_FETCH });

export const storeDrinks = (payload) => ({ type: STORE_DRINKS, payload });

export function getDrinks() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const drinks = await fetchDrinks();
    dispatch(storeDrinks(drinks));
  };
}
