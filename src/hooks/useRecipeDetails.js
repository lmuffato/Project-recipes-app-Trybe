import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useClipBoard from './useClipboard';
import usePersistedState from './usePersistedState';

import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchById, fetchName } from '../services/data';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const INITIAL_STATE = {
  meals: [{ strYoutube: '' }],
  drinks: [{ strYoutube: '' }],
};

export default function useRecipeDetails(type) {
  const {
    recommendedSite,
    portugueseFood,
    site,
    idFood,
    typeFood,
    foodUpperCase,
  } = getMealsOrDrinks(type);
  const { push } = useHistory();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(INITIAL_STATE);
  const [recommended, setRecommended] = useState(INITIAL_STATE);
  const [favoriteRecipes, setFavoriteRecipes] = usePersistedState(
    'favoriteRecipes',
    [],
  );
  const {
    showClipBoardMsg, copyToClipBoard, renderClipBoardMsg,
  } = useClipBoard(id, portugueseFood);

  const getIngredientsAndMeasures = (rcp) => {
    const entriesRecipe = Object.entries(rcp);

    const ingredients = entriesRecipe.reduce((acc, [key, value]) => {
      if (key.includes('strIngredient') && value) return acc.concat(value);
      return acc;
    }, []);
    const measures = entriesRecipe.reduce((acc, [key, value]) => {
      if (key.includes('strMeasure') && value) return acc.concat(value);
      return acc;
    }, []);

    return { ingredients, measures };
  };

  const filterRecommended = (rec) => {
    const maxLengthRecipes = 6;
    const filteredRecommended = rec.filter(
      (drink, index) => index < maxLengthRecipes,
    );
    return filteredRecommended;
  };

  const redirectToProgressPage = () => {
    push(`/${portugueseFood}/${id}/in-progress`);
  };

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

  const setHeart = (recipeStorage) => {
    const favoriteObj = getFavoriteInfos(recipeStorage);
    const newFavoritedRecipes = favoriteRecipes.length
      ? favoriteRecipes.reduce((acc, cur) => {
        if (cur.id === favoriteObj.id) return acc;
        return acc.concat(cur);
      }, [])
      : [favoriteObj];

    setFavoriteRecipes(newFavoritedRecipes);
  };

  const checkFavorite = () => favoriteRecipes.some((fav) => fav.id === id);

  useEffect(() => {
    const fetchDidMount = async () => {
      const resultRecipe = await fetchById(site, id);
      const resultRecommended = await fetchName(recommendedSite);
      setRecipe(resultRecipe);
      setRecommended(resultRecommended);
    };

    fetchDidMount();
  }, []);

  return {
    recipe,
    recommended,
    showClipBoardMsg,
    whiteHeartIcon,
    blackHeartIcon,
    favoriteRecipes,
    getIngredientsAndMeasures,
    filterRecommended,
    redirectToProgressPage,
    copyToClipBoard,
    renderClipBoardMsg,
    getFavoriteInfos,
    setHeart,
    checkFavorite,
  };
}
