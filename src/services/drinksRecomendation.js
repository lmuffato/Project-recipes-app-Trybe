const drinksRecomendation = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const fetchData = await fetch(url);
  const { drinks } = await fetchData.json();
  const number = 6;
  const result = drinks.filter((_, index) => index < number);
  return result;
};

export default drinksRecomendation;
