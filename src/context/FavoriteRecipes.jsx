import React, { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useLocalStorage from '../hooks/useLocalStorage';

export const FavoriteRecipesContext = createContext();

export function FavoriteRecipesProvider({ children }) {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);

  const {
    favoriteRecipes: favoriteRecipeInLocalStorage,
  } = useLocalStorage('favoriteRecipes');

  useEffect(() => {
    if (!favoriteRecipeInLocalStorage) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      setFavoriteRecipe([]);
    } else {
      setFavoriteRecipe(favoriteRecipeInLocalStorage);
    }
  }, []);

  function addFavoriteRecipe(id, recipe, pathname) {
    const lastCharacter = -1;
    const newFavoriteRecipe = {
      id,
      type: pathname.split('/')[1].slice(0, lastCharacter),
      area: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.name,
      image: recipe.imagePath,
    };

    const newFavoriteRecipes = [...favoriteRecipe, newFavoriteRecipe];

    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));

    setFavoriteRecipe(newFavoriteRecipes);
  }

  function removeFavoriteRecipe(id) {
    const updatedFavoriteRecipes = favoriteRecipe.filter(
      (recipeLiked) => recipeLiked.id !== id,
    );

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));

    setFavoriteRecipe(updatedFavoriteRecipes);
  }

  const value = {
    favoriteRecipe,
    addFavoriteRecipe,
    removeFavoriteRecipe,
  };

  return (
    <FavoriteRecipesContext.Provider value={ value }>
      {children}
    </FavoriteRecipesContext.Provider>
  );
}

FavoriteRecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
