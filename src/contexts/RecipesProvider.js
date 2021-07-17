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
  const [recomendations, setRecomendations] = useState(null);
  const [favoriteRecipes, setFavRecipes] = useState(() => {
    const favRecipe = localStorage.getItem('favoriteRecipes');
    return favRecipe ? JSON.parse(favRecipe) : [];
  });
  const [showRecipes, setShowRecipes] = useState(favoriteRecipes);
  const [ingredients, setIngredients] = useState([
    { idIngredient: '1',
      strIngredient: 'Chicken',
      strDescription: 'The chicken ...',
      strType: null }]);
  const [mealsAndDrinkByIngredients, setMealsAndDrinkByIngredients] = useState(null);
  const [allChecked, setAllChecked] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

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
    recomendations,
    setRecomendations,
    favoriteRecipes,
    setFavRecipes,
    showRecipes,
    setShowRecipes,
    ingredients,
    setIngredients,
    mealsAndDrinkByIngredients,
    setMealsAndDrinkByIngredients,
    allChecked,
    setAllChecked,
    isFavorite,
    setIsFavorite,
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
