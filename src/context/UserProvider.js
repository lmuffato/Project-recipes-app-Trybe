import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { fetchMealById, fetchDrinkById } from '../services/getApis';
import { getItemFromLocalStorage } from '../services/localStorage';

function UserProvider({ children }) {
  let storage = [];
  const localStorage = getItemFromLocalStorage('favoriteRecipes');
  if (localStorage) storage = localStorage;
  let inProgress = { meals: {}, cocktails: {} };
  const localInProgress = getItemFromLocalStorage('inProgressRecipes');
  if (localInProgress && localInProgress.meals !== {}) inProgress = localInProgress;
  let doneStorage = [];
  const localDone = getItemFromLocalStorage('doneRecipes');
  if (localDone && localDone !== []) doneStorage = localDone;
  const [inProgressStorage, setInProgressStorage] = useState(inProgress);
  const [email, setEmail] = useState('');
  const [globalRecipe, setGlobalRecipe] = useState('');
  const [globalId, setGlobalId] = useState('');
  const [currentMeal, setCurrentMeal] = useState({});
  const [currentDrink, setCurrentDrink] = useState({});
  const [favoriteRecipe, setFavoriteRecipe] = useState(storage);
  const [doneRecipes, setDoneRecipes] = useState(doneStorage);

  const getMealById = async (id) => {
    if (id) {
      const result = await fetchMealById(id);
      if (result.meals) setCurrentMeal(result.meals[0]);
    }
  };

  const getDrinkById = async (id) => {
    if (id) {
      const result = await fetchDrinkById(id);
      if (result.drinks) setCurrentDrink(result.drinks[0]);
    }
  };

  useEffect(() => {
    getMealById(globalId);
    getDrinkById(globalId);
  }, [globalId]);

  return (
    <UserContext.Provider
      value={ {
        email,
        setEmail,
        globalRecipe,
        setGlobalRecipe,
        globalId,
        setGlobalId,
        currentMeal,
        getDrinkById,
        currentDrink,
        favoriteRecipe,
        setFavoriteRecipe,
        inProgressStorage,
        setInProgressStorage,
        doneRecipes,
        setDoneRecipes,
      } }
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
