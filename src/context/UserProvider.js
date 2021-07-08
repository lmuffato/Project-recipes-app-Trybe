import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';
import { fetchMealById, fetchDrinkById } from '../services/getApis';
import { getItemFromLocalStorage } from '../services/localStorage';

function UserProvider({ children }) {
  let storage = [];
  const localStorage = getItemFromLocalStorage('favoriteRecipes');
  if (localStorage) storage = localStorage;

  const [email, setEmail] = useState('');
  const [globalRecipe, setGlobalRecipe] = useState('');
  const [globalId, setGlobalId] = useState('');
  const [currentMeal, setCurrentMeal] = useState({});
  const [currentDrink, setCurrentDrink] = useState({});
  const [favoriteRecipe, setFavoriteRecipe] = useState(storage);


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
