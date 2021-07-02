const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

const fetchDrinkCategories = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default fetchDrinkCategories;
