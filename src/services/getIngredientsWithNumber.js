export default function getIngredientsWithNumber(data) {
  const keys = Object.keys(data);
  const filteredKeys = keys.filter((key) => key.includes('Ingredient'));
  const obj = {};
  filteredKeys.forEach((key) => {
    const number = key.split('Ingredient')[1];
    obj[data[key]] = number;
  });
  return obj;
}
