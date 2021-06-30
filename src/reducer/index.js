import { EMAIL_LOGIN, PASSWORD_LOGIN } from '../common/def';

export default function loginReducer(state, action) {
  switch (action.type) {
  case EMAIL_LOGIN:
    return {
      ...state,
      email: action.payload,
    };
  case PASSWORD_LOGIN:
    return {
      ...state,
      password: action.payload,
    };
  default:
    return state;
  }
}
