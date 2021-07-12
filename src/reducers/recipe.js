import { HANDLE_INFO_RECIPE, HANDLE_CURRENT_SEARCH } from '../actions';

const INITIAL_STATE = {
  typeRecipe: '',
  currentSearch: [],
};

const recipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_INFO_RECIPE:
    return {
      ...state,
      typeRecipe: action.typeRecipe,
    };
  case HANDLE_CURRENT_SEARCH:
    return {
      ...state,
      currentSearch: action.currentSearch,
    };
  default:
    return {
      ...state,
    };
  }
};

export default recipe;
