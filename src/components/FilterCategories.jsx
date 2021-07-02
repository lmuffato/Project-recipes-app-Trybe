export const FilterCategoriesDrinks = async (props) => {
  const URL = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${props}`;
  let data = await (await (fetch(URL)).json);
  const limitNumber = 12;
  if (data.length > limitNumber) {
    data = data.slice(0, limitNumber);
  }
  return data;
};

export const FilterCategoriesFood = async (props) => {
  const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${props}`;
  let data = await (await (fetch(URL)).json);
  const limitNumber = 12;
  if (data.length > limitNumber) {
    data = data.slice(0, limitNumber);
  }
  return data;
};
