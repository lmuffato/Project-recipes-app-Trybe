function getIngredients(data, key) {
  const result = Object.entries(data).filter((e) => (
    e[0].includes(key)
      && (e[1] !== null && e[1] !== '' && e[1] !== ' ')
  ));
  return Object.fromEntries(result);
}

export default getIngredients;
