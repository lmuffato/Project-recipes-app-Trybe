import { HANDLE_CURRENT_SEARCH } from '../actions';

const INITIAL_STATE = {
  typeRecipe: '',
  currentSearch: [],
};

const recipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CURRENT_SEARCH:
    return {
      ...state,
      currentSearch: action.payload.currentSearch,
      typeRecipe: action.payload.typeRecipe,
    };
  default:
    return {
      ...state,
    };
  }
};

export default recipe;
