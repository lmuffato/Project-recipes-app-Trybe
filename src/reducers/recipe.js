import { HANDLE_INFO_RECIPE } from '../actions';

const INITIAL_STATE = {
  id: '',
  type: '',
};

const recipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_INFO_RECIPE:
    return {
      ...state,
      id: action.id,
      type: action.type,
    };
  default:
    return {
      ...state,
    };
  }
};

export default recipe;
