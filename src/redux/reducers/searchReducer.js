import { ACTION_SEARCH } from '../actions';

const searchReducer = (state = '', action) => {
  switch (action.type) {
  case ACTION_SEARCH:
    return {
      ...state,
      data: action.data,
    };
  default:
    return state;
  }
};

export default searchReducer;
