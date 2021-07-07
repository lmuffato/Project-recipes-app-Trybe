import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as moment from 'moment';

import usePersistedState from './usePersistedState';
import useClipBoard from './useClipboard';

import getMealsOrDrinks from '../helper/mealsOrDrinksMethods';
import { fetchById } from '../services/data';

import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const INITIAL_STATE_STORAGE = { cocktails: {}, meals: {} };
const INITIAL_STATE_HOOKS = {
  meals: [{}],
  drinks: [{}],
};

export default function useRecipeProgress(type) {
  const [inProgressRecipes, setInProgressRecipes] = usePersistedState(
    'inProgressRecipes',
    INITIAL_STATE_STORAGE,
  );
  const [favoriteRecipes, setFavoriteRecipes] = usePersistedState(
    'favoriteRecipes',
    [],
  );
  const [doneRecipes] = usePersistedState('doneRecipes', []);
  const [recipeProgress, setRecipeProgress] = useState(INITIAL_STATE_HOOKS);
  const { push } = useHistory();
  const { id } = useParams();
  const {
    site, sites, idFood, typeFood, foodUpperCase, portugueseFood,
  } = getMealsOrDrinks(type);
  const { showClipBoardMsg, copyToClipBoard } = useClipBoard(id, portugueseFood);

  useEffect(() => {
    const fetchDidMount = async () => {
      const recipe = await fetchById(site, id);
      setRecipeProgress(recipe);
    };

    fetchDidMount();
  }, []);

  // REFATORAR
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

  const renderClipBoardMsg = () => <div>Link copiado!</div>;
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
    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...doneRecipes, recipeDoneInfo]),
    );
    // Bug com o usePersistedState
    // setDoneRecipes([...doneRecipes, recipeDoneInfo]);
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
