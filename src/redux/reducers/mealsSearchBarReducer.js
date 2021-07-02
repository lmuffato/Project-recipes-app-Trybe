import { FINISHED_LOADING_MEAL_RECIPES,
  LOADING_MEAL_RECIPES,
  LOADING_MEAL_RECIPES_FAILED,
  SET_SEARCH_BAR_MEALS,
} from '../actions/mealsAction';

const INITIAL_STATE = {
  loadingRecipes: false,
  loadingRecipesError: null,
  recipes: [],
};

export default function mealsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOADING_MEAL_RECIPES:
    return { ...state,
      loadingRecipes: true };
  case FINISHED_LOADING_MEAL_RECIPES:
    return { ...state,
      loadingRecipes: false };
  case LOADING_MEAL_RECIPES_FAILED:
    return { ...state,
      loadingRecipes: false,
      loadingRecipesError: action.payload.message };
  case SET_SEARCH_BAR_MEALS:
    return { ...state, recipes: action.payload };
  default:
    return state;
  }
}
