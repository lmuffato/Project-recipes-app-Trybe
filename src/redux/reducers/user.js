import { SET_EMAIL } from '../actions/userAction';

const INITIAL_STATE = {
  email: '',
  passaword: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_EMAIL:
    return { ...state, email: action.payloadEmailValue };
  default:
    return state;
  }
};

export default user;
