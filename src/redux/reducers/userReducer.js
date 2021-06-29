// import { SELECT_MOVIE } from '../actions/index';
// import categories from '../data';
const INITIAL_STATE = {
  email: '',
  password: '',
};

export const LOGIN = 'LOGIN';

export default function movieReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
    };
  default:
    return state;
  }
}
