import { API_DRINK_FETCH, SET_DRINK_INGREDIENT, SET_DRINKS_FILTER,
  SPECIFIC_DRINK, STORE_DRINKS } from '../actions/drinks';

const INITIAL_STATE = {
  categories: [],
  specificDrink: [],
  drinks: [],
  loading: false,
  search: false,
  filter: '',
  ingredient: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_DRINK_FETCH:
    return { ...state, loading: true };
  case SET_DRINK_INGREDIENT:
    return { ...state, search: true, ingredient: action.payload };
  case STORE_DRINKS:
    return { ...state, drinks: action.payload, loading: false, search: false };
  case SET_DRINKS_FILTER:
    return { ...state, filter: action.payload };
  case SPECIFIC_DRINK:
    return { ...state, specificDrink: action.payload, loading: false };
  default:
    return state;
  }
};

export default recipes;
