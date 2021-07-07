const getCat = (arr) => {
  const toReturn = arr.map((ele) => ele.strCategory);
  return toReturn;
};

const getMealsCat = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { meals } = data;
  const toReturn = getCat(meals);
  return toReturn;
};

export default getMealsCat;
