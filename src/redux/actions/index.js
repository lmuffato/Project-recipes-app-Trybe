export const ACTION_LOGIN = 'ACTION_LOGIN';

export const actionLogin = (email, password) => ({
  type: ACTION_LOGIN,
  email,
  password,
});
