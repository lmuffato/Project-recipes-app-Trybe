const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const fetchFoodCategories = async () => {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return response.ok ? Promise.resolve(data) : Promise.reject(data);
};

export default fetchFoodCategories;
