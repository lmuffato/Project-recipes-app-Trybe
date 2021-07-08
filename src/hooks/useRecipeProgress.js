import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as moment from 'moment';

import useClipBoard from './useClipboard';
import useFavoriteRecipe from './useFavoriteRecipe';

import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchById } from '../services/data';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import useRecipe from './useRecipe';

const INITIAL_STATE_HOOKS = {
  meals: [{}],
  drinks: [{}],
};

export default function useRecipeProgress(type) {
  const {
    inProgressRecipes,
    setInProgressRecipes,
    doneRecipes,
    setDoneRecipes,
  } = useRecipe();
  const [recipeProgress, setRecipeProgress] = useState(INITIAL_STATE_HOOKS);
  const { push } = useHistory();
  const { id } = useParams();
  const { site, sites, portugueseFood } = getMealsOrDrinks(type);
  const {
    showClipBoardMsg,
    copyToClipBoard,
    renderClipBoardMsg,
  } = useClipBoard(id, portugueseFood);
  const { setHeart, getFavoriteInfos, checkFavorite } = useFavoriteRecipe(type, id);

  useEffect(() => {
    const fetchDidMount = async () => {
      const recipe = await fetchById(site, id);
      setRecipeProgress(recipe);
    };

    fetchDidMount();
  }, []);

  // REFATORAR
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
  // REFATORAR ^^^^^^^^

  const addToLocalStorage = (idArray, value) => {
    const newInProgressRecipes = {
      ...inProgressRecipes,
      [sites]: { [id]: [...idArray, value] },
    };

    setInProgressRecipes(newInProgressRecipes);
  };
  const removeFromLocalStorage = (idArray, value) => {
    const filteredIdArray = idArray.filter(
      (ingredient) => ingredient !== value,
    );

    const newInProgressRecipes = {
      ...inProgressRecipes,
      [sites]: { [id]: filteredIdArray },
    };

    setInProgressRecipes(newInProgressRecipes);
  };

  const sendToLocalStorage = ({ target }) => {
    const { checked, value } = target;
    const idArray = inProgressRecipes[sites][id] || [];

    if (!checked) {
      removeFromLocalStorage(idArray, value);
      return;
    }

    addToLocalStorage(idArray, value);
  };

  const isChecked = (ingredient) => {
    if (!inProgressRecipes[sites][id]) return false;
    return inProgressRecipes[sites][id].some((ingred) => ingred === ingredient);
  };

  const recipeDoneCheck = (ingredients) => {
    const checkedIngredients = inProgressRecipes[sites][id] || [];
    return ingredients.length === checkedIngredients.length;
  };

  const getRecipeDoneInfo = (recipeDone) => {
    const date = moment().format('DD/MM/YYYY');
    return {
      ...getFavoriteInfos(recipeDone),
      doneDate: date,
      tags: recipeDone.strTags || '',
    };
  };

  const redirectToRecipeDonePage = (recipeDone) => {
    const recipeDoneInfo = getRecipeDoneInfo(recipeDone);
    setDoneRecipes([...doneRecipes, recipeDoneInfo]);
    push('/receitas-feitas');
  };

  return {
    inProgressRecipes,
    recipeProgress,
    setInProgressRecipes,
    blackHeartIcon,
    whiteHeartIcon,
    showClipBoardMsg,
    push,
    isChecked,
    copyToClipBoard,
    checkFavorite,
    setHeart,
    renderClipBoardMsg,
    getIngredientsAndMeasures,
    sendToLocalStorage,
    recipeDoneCheck,
    redirectToRecipeDonePage,
  };
}
