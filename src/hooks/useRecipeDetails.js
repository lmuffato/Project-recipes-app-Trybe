import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import useClipBoard from './useClipboard';
import useFavoriteRecipe from './useFavoriteRecipe';

import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchById, fetchName } from '../services/data';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useRecipe from './useRecipe';

const INITIAL_STATE = {
  meals: [{ strYoutube: '' }],
  drinks: [{ strYoutube: '' }],
};

export default function useRecipeDetails(type) {
  const { recommendedSite, portugueseFood, site } = getMealsOrDrinks(type);
  const { push } = useHistory();
  const { doneRecipes } = useRecipe();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(INITIAL_STATE);
  const [recommended, setRecommended] = useState(INITIAL_STATE);
  const {
    showClipBoardMsg, copyToClipBoard, renderClipBoardMsg,
  } = useClipBoard(id, portugueseFood);
  const {
    setHeart,
    getFavoriteInfos,
    checkFavorite,
    favoriteRecipes,
  } = useFavoriteRecipe(type, id);

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

  const diplayNoneButton = () => doneRecipes.some((doneRcp) => doneRcp.id === id);

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
    diplayNoneButton,
  };
}
