import { API_FETCH, SET_DRINKS_FILTER, STORE_DRINKS } from '../actions/drinks';

const INITIAL_STATE = {
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
  default:
    return state;
  }
};

export default recipes;
