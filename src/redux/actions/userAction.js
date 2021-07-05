export const SET_EMAIL = 'SET_EMAIL';

function setEmail(payloadEmailValue) {
  return {
    type: SET_EMAIL,
    payloadEmailValue,
  };
}

export default setEmail;
