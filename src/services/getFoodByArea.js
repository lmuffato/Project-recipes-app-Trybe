const setAreas = (arr) => {
  const toReturn = arr.map((e) => {
    const { strArea } = e;
    return (strArea);
  });
  return toReturn;
};

const getByArea = async () => {
  const endPoint = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
  const response = await fetch(endPoint);
  const data = await response.json();
  const { meals } = data;
  const toReturn = await setAreas(meals);

  return toReturn;
};

export default getByArea;
