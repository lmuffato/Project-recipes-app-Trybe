import { ACTION_DETAILS } from '../actions';

const detailsReducer = (state = '', action) => {
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
