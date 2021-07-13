import { getItemFromLocalStorage } from './localStorage';
import { ApiRecipeDetail } from './theMealAPI';
import { ApiDetailsById } from './theCockTailAPI';

const GetDoneDetails = async () => {
  let storageItems = getItemFromLocalStorage('doneRecipes');
  if (!storageItems) storageItems = [];
  let list = [];
  if (storageItems !== null && storageItems !== undefined && storageItems.length > 0) {
    const promises = await storageItems.map((item) => {
      if (item.type === 'comida') {
        return ApiRecipeDetail(item.id);
      }
      return ApiDetailsById(item.id);
    });
    // Fonte: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
    list = await Promise.all(promises);
  }

  if (storageItems !== null && storageItems !== undefined
    && storageItems.type === 'comida') {
    return ApiRecipeDetail(storageItems.id);
  }

  if (list.length) {
    const listItems = list.map((item) => {
      const keys = Object.keys(item);
      if (keys.includes('meals')) {
        return item.meals[0];
      }
      return item.drinks[0];
    });
    return listItems;
  }

  return storageItems !== null && storageItems !== undefined && ApiDetailsById(storageItems.id);
};

export default GetDoneDetails;
