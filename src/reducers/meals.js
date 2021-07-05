import {
  API_FETCH, SET_MEALS_FILTER, STORE_CATEGORIES, STORE_MEALS } from '../actions/meals';

const INITIAL_STATE = {
  categories: [],
  meals: [],
  loading: false,
  filter: '',
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case API_FETCH:
    return { ...state, loading: true };
  case STORE_CATEGORIES:
    return { ...state, categories: action.payload, loading: false };
  case STORE_MEALS:
    return { ...state, meals: action.payload, loading: false };
  case SET_MEALS_FILTER:
    return { ...state, filter: action.payload };
  default:
    return state;
  }
};

export default recipes;
