export default function redirectAction(value) {
  return {
    type: 'REDIRECT',
    payload: value,
  };
}
