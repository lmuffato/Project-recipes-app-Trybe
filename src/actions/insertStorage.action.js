export default function emailLoginAction(mealsToken, cocktailsToken) {
  return {
    type: 'INSERT_STORAGE',
    payload: {
      mealsToken,
      cocktailsToken,
    },
  };
}
