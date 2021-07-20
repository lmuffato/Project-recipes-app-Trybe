async function fetchCountries() {
  const areaCategory = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((req) => req.json())
    .then((res) => res.meals);
  const area = ['All'];
  areaCategory.forEach((country) => {
    area.push(country.strArea);
  });
  return area;
}

export default fetchCountries;
