import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [type, setType] = useState(null);
  const [splitEnd, setSplitEnd] = useState(null);
  const [mealOrDrink, setMealOrDrink] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [searchedRecipes, setSearchedRecipes] = useState(null);
  const [idMeal, setIdMeal] = useState();
  const [idDrink, setIdDrink] = useState();
  const [favoriteRecipes, setFavRecipes] = useState(() => {
    const favRecipe = localStorage.getItem('favoriteRecipes');
    return favRecipe ? JSON.parse(favRecipe) : [];
  });
  const [showRecipes, setShowRecipes] = useState(favoriteRecipes);

  const contextValue = {
    type,
    splitEnd,
    setType,
    setSplitEnd,
    mealOrDrink,
    setMealOrDrink,
    recipes,
    setRecipes,
    searchedRecipes,
    setSearchedRecipes,
    idMeal,
    setIdMeal,
    idDrink,
    setIdDrink,
    favoriteRecipes,
    setFavRecipes,
    showRecipes,
    setShowRecipes,
  };

  return (
    <RecipesContext.Provider value={ contextValue }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default RecipesProvider;
