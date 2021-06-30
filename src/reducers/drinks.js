import { API_FETCH, STORE_DRINKS } from '../actions/drinks';

const INITIAL_STATE = {
  drinks: [],
  loading: false,
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_FETCH:
    return { ...state, loading: true };
  case STORE_DRINKS:
    return { ...state, drinks: action.payload, loading: false };
  default:
    return state;
  }
};

export default recipes;
