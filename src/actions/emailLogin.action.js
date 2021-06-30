export default function emailLoginAction(email) {
  return {
    type: 'EMAIL_LOGIN',
    payload: email,
  };
}
