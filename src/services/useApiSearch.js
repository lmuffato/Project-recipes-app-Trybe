import {
  fetchByIngredientApi,
  fetchByNameApi,
  fetchByFirstLetterApi,
} from './fetchApiRadio';

let searchResults = '';
const length = 1;
export default async function apiSearch(searchValue, inputValue, page) {
  switch (searchValue) {
  case 'ingredient-search':
    searchResults = await fetchByIngredientApi(inputValue, page);
    console.log(searchResults);
    break;
  case 'name-search':
    searchResults = await fetchByNameApi(inputValue, page);
    console.log(searchResults);
    break;
  case 'first-letter-search':
    if (inputValue.length > length) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      searchResults = await fetchByFirstLetterApi(inputValue, page);
      console.log(searchResults);
    }
    break;

  default:
    return alert('nao encontrado');
  }
}
