export default function getIngredientsWithNumber(data) {
  const keys = Object.keys(data);
  const filteredKeys = keys.filter((key) => key.includes('Ingredient'));
  const obj = {};
  filteredKeys.forEach((key) => {
    obj[data[key]] = key[key.length - 1];
  });
  return obj;
}
