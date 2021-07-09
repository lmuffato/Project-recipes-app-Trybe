import { ACTION_DETAILS, ACTION_FAVORITES, ID_REC_IN_PROGRESS } from '../actions';

const INITIAL_STATE = {
  favorites: [],
  data: '',
  recInProgress: {
    id: '',
    ingredients: '',
    measure: '',
  },
};

const detailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_FAVORITES:
    return {
      ...state,
      favorites: action.obj,
    };
  case ACTION_DETAILS:
    return {
      ...state,
      data: action.data,
    };
  case ID_REC_IN_PROGRESS:
    return {
      ...state,
      recInProgress: {
        id: action.idMeal,
        ingredients: action.ingredients,
        measure: action.measure,
      },
    };
  default:
    return state;
  }
};

export default detailsReducer;
