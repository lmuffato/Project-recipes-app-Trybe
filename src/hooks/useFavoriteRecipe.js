import useRecipe from './useRecipe';
import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';

export default function useFavoriteRecipe(type, id, isCard = false) {
  const { favoriteRecipes, setFavoriteRecipes } = useRecipe();

  const {
    idFood,
    typeFood,
    foodUpperCase,
  } = getMealsOrDrinks(type);

  const getFavoriteInfos = (recipeStorage) => {
    let alcoholTest;

    if (
      recipeStorage.strAlcoholic
      && recipeStorage.strAlcoholic === 'Alcoholic'
    ) {
      alcoholTest = 'Alcoholic';
    } else if (recipeStorage.strAlcoholic) {
      alcoholTest = 'non-alcoholic';
    } else alcoholTest = '';

    return {
      id: recipeStorage[idFood],
      type: typeFood,
      area: recipeStorage.strArea || '',
      category: recipeStorage.strCategory,
      alcoholicOrNot: alcoholTest,
      name: recipeStorage[`str${foodUpperCase}`],
      image: recipeStorage[`str${foodUpperCase}Thumb`],
    };
  };

  const setFav = (favoriteObj) => {
    if (!favoriteRecipes.length) return [favoriteObj];

    if (favoriteRecipes.some((fav) => fav.id === favoriteObj.id)) {
      return favoriteRecipes.filter((fav) => fav.id !== favoriteObj.id);
    }

    return [...favoriteRecipes, favoriteObj];
  };

  const setHeart = (recipeStorage) => {
    const favoriteObj = isCard ? recipeStorage : getFavoriteInfos(recipeStorage);
    const newFavoritedRecipes = setFav(favoriteObj);
    setFavoriteRecipes(newFavoritedRecipes);
  };

  const checkFavorite = () => favoriteRecipes.some((fav) => fav.id === id);

  return { setHeart, getFavoriteInfos, checkFavorite, favoriteRecipes };
}
