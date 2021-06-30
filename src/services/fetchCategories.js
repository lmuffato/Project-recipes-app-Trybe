export default async function fetchCategories() {
  const size = 5;
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const { categories } = await (await fetch(endpoint)).json();
  return categories.slice(0, size).map(({ strCategory }) => strCategory);
}
