const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

const fetchFoodCategories = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return response.ok ? Promise.resolve(data) : Promise.reject(data);
  } catch (error) {
    console.error(error);
  }
};

export default fetchFoodCategories;
