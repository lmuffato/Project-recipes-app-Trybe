export default function emailLoginAction(password) {
  return {
    type: 'PASSWORD_LOGIN',
    payload: password,
  };
}
