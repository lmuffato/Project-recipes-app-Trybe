const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';

const fetchDrinkIngredients = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchDrinkIngredients;
