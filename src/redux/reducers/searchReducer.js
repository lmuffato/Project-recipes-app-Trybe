import { ACTION_SEARCH, ACTION_MAIN_FOOD_LIST } from '../actions';

const INITIAL_STATE = {
  data: '',
  item: '',
  recipeCategoryList: [],
};

const searchReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_SEARCH:
    return {
      ...state,
      data: action.data,
      item: action.item,
    };
  case ACTION_MAIN_FOOD_LIST:
    return {
      ...state,
      recipeCategoryList: action.recipeList,
    };
  default:
    return state;
  }
};

export default searchReducer;
