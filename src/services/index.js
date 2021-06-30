/**
 * Essa função serve para fazer um fetch a um dado endpoint,
 * retornando um objeto com a resposta.
 * Observação: Essa função já realiza o json parse na resposta da API.
 * @param {string} URL O endpoint onde será feito o GET request.
 * @return {object} Resposta da API.
 */
export async function fetchAPI(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  return data;
}

export const ALL_CATEGORIES_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const ALL_MEALS_ENDPOINT = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const MEALS_BY_CATEGORY_ENDPOINT = (category) => `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
