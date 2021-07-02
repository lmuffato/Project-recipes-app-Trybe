import { EMAIL_LOGIN, PASSWORD_LOGIN, INSERT_STORAGE, REDIRECT } from '../common/def';

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
  case INSERT_STORAGE:
    return {
      ...state,
      mealsToken: action.payload.mealsToken,
      cocktailsToken: action.payload.cocktailsToken,
    };
  case REDIRECT:
    return {
      ...state,
      redirect: action.payload,
    };
  default:
    return state;
  }
}
