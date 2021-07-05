import { API_FETCH, SET_DRINKS_FILTER,
  SPECIFIC_DRINK, STORE_DRINKS } from '../actions/drinks';

const INITIAL_STATE = {
  categories: [],
  specificDrink: [],
  drinks: [],
  loading: false,
  filter: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_FETCH:
    return { ...state, loading: true };
  case STORE_DRINKS:
    return { ...state, drinks: action.payload, loading: false };
  case SET_DRINKS_FILTER:
    return { ...state, filter: action.payload };
  case SPECIFIC_DRINK:
    return { ...state, specificDrink: action.payload, loading: false };
  default:
    return state;
  }
};

export default recipes;
