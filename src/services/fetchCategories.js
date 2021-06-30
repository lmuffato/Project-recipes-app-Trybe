export default async function fetchCategories() {
  const endpoint = 'https://www.themealdb.com/api/json/v1/1/categories.php';
  const { categories } = await (await fetch(endpoint)).json();
  return categories.map(({ strCategory }) => strCategory);
}
