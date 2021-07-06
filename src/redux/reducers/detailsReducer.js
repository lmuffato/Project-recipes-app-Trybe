import { ACTION_DETAILS } from '../actions';

const INITIAL_STATE = {
  data: '',
};

const detailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ACTION_DETAILS:
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export default detailsReducer;
