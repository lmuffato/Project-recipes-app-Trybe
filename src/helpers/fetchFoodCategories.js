const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
//  https://www.themealdb.com/api/json/v1/1/list.php?c=list

const fetchFoodCategories = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchFoodCategories;
