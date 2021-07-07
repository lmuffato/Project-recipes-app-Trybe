import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getItemFromLocalStorage, setToLocalStorage } from '../services/localStorage';

function checkFavRecipes(id, storageItems, setShouldColor) {
  const itemFound = storageItems.find((item) => item.id === id);
  if (itemFound) {
    const newStorage = storageItems.filter((items) => items !== itemFound);
    setShouldColor(false);
    return setToLocalStorage('favoriteRecipes', newStorage);
  }
  return false;
}

function checkFavRecipesToColor(id, storageItems, setShouldColor) {
  const itemFound = storageItems.find((item) => item.id === id);
  if (itemFound) {
    return setShouldColor(true);
  }
  return setShouldColor(false);
}

const addToEmptyStorage = (recipe, setShouldColor) => {
  const { idMeal, strMeal, strCategory, strArea, strMealThumb } = recipe;
  const storageItem = [{ id: idMeal,
    type: 'comida',
    area: strArea,
    category: strCategory,
    alcoholicOrNot: '',
    name: strMeal,
    image: strMealThumb }];
  setShouldColor(true); setToLocalStorage('favoriteRecipes', storageItem);
};
const addToEmptyDrinkStorage = (recipe, setShouldColor) => {
  const { idDrink, strDrink, strCategory, strDrinkThumb,
    strAlcoholic } = recipe;
  const storageItem = [{ id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory,
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb }];
  setShouldColor(true); setToLocalStorage('favoriteRecipes', storageItem);
};

const verifyColor = (setShouldColor, recipe, pathname) => {
  const storageItems = getItemFromLocalStorage('favoriteRecipes');
  if (storageItems && pathname.includes('comidas')) {
    const { idMeal } = recipe;
    return checkFavRecipesToColor(idMeal, storageItems, setShouldColor);
  }
  if (storageItems && pathname.includes('bebidas')) {
    const { idDrink } = recipe;
    return checkFavRecipesToColor(idDrink, storageItems, setShouldColor);
  }
};

const RecipeFav = (recipe, addOrNot, setShouldColor) => {
  const history = useHistory();

  useEffect(() => {
    const { pathname } = history.location;
    verifyColor(setShouldColor, recipe, pathname);
  }, [recipe]);

  useEffect(() => {
    let storageItems = getItemFromLocalStorage('favoriteRecipes');
    const { pathname } = history.location;
    if (!addOrNot) return;
    if (!storageItems
      && pathname.includes('comidas')) addToEmptyStorage(recipe, setShouldColor);
    if (!storageItems
      && pathname.includes('bebidas')) addToEmptyDrinkStorage(recipe, setShouldColor);
    if (storageItems && pathname.includes('comidas')) {
      const { idMeal, strMeal, strCategory, strArea, strMealThumb } = recipe;
      checkFavRecipes(idMeal, storageItems, setShouldColor);
      if (checkFavRecipes(idMeal, storageItems, setShouldColor) === false) {
        storageItems = storageItems.concat({ id: idMeal,
          type: 'comida',
          area: strArea,
          category: strCategory,
          alcoholicOrNot: '',
          name: strMeal,
          image: strMealThumb });
        setShouldColor(true); setToLocalStorage('favoriteRecipes', storageItems);
      }
    }
    if (storageItems && pathname.includes('bebidas')) {
      const { idDrink, strDrink, strCategory, strDrinkThumb,
        strAlcoholic } = recipe;
      checkFavRecipes(idDrink, storageItems, setShouldColor);
      if (checkFavRecipes(idDrink, storageItems, setShouldColor) === false) {
        storageItems = storageItems.concat({ id: idDrink,
          type: 'bebida',
          area: '',
          category: strCategory,
          alcoholicOrNot: strAlcoholic,
          name: strDrink,
          image: strDrinkThumb });
        setShouldColor(true); setToLocalStorage('favoriteRecipes', storageItems);
      }
    }
  }, [recipe, addOrNot]);
};

export default RecipeFav;
