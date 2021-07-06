const getCat = (arr) => {
  const toReturn = arr.map((ele) => ele['strCategory'])
  return toReturn;
}

const getDrinksCat = async () => {
  const endPoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { drinks } = data;
  const toReturn = getCat(drinks);
  return toReturn;
};

export default getDrinksCat;
