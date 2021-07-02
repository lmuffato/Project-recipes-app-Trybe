import { SET_SEARCH_BAR_MEALS } from '../actions/mealsAction';

const INITIAL_STATE = {
  recipes: [],
};

export default function mealsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_SEARCH_BAR_MEALS:
    return { ...state, recipes: action.payload };
  default:
    return state;
  }
}
