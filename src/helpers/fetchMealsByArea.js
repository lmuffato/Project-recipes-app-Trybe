async function fetchMealsByArea(country) {
  let url = '';
  if (country === '') {
    url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  } else {
    url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${country}`;
  }
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

export default fetchMealsByArea;
