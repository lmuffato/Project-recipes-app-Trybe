import fetchCategories from '../services/fetchCategories';

export const API_FETCH = 'API_FETCH';
export const STORE_CATEGORIES = 'STORE_CATEGORIES';

export const apiFetch = () => ({ type: API_FETCH });

export const storeCategories = (payload) => ({ type: STORE_CATEGORIES, payload });

export function getCategories() {
  return async (dispatch) => {
    dispatch(apiFetch());
    const categories = await fetchCategories();
    dispatch(storeCategories(categories));
  };
}
