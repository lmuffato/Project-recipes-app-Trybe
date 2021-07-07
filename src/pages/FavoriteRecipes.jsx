import React, { useState, useEffect } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard/FavoriteRecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) setFavoriteRecipes(favoriteStorage);
  }, []);

  if (favoriteRecipes.length === 0) {
    return (
      <div>
        <h2>Você não possui receitas favoritas!</h2>
      </div>
    );
  }

  return (
    <div>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <h1>Receitas Favoritas</h1>
      { favoriteRecipes.map((recipe, index) => (
        <FavoriteRecipeCard recipe={ recipe } index={ index } key={ index } />
      )) }
    </div>
  );
}

export default FavoriteRecipes;
