import { API_FETCH, STORE_CATEGORIES } from '../actions/recipes';

const INITIAL_STATE = {
  categories: [],
  loading: false,
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_FETCH:
    return { ...state, loading: true };
  case STORE_CATEGORIES:
    return { ...state, categories: action.payload, loading: false };
  default:
    return state;
  }
};

export default recipes;
