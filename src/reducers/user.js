import {
  HANDLE_CHANGE_USER,
} from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case HANDLE_CHANGE_USER:
    return {
      ...state,
      email: action.payload.value,
    };
  default:
    return state;
  }
};

export default user;
