import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import RecipeContext from '../../context/RecipeContext';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

export default function FavoriteRecipes() {
  document.title = 'Receitas Favoritas';
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipeContext);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(allRecipes);
  }, [setFavoriteRecipes]);

  function filterFavoriteRecipesType(filterName, arr) {
    const filterRecipeType = arr
      .filter((recipe) => recipe.type === filterName);
    switch (filterName) {
    case '':
      return arr;
    default:
      return filterRecipeType;
    }
  }

  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('bebida') }
      >
        Drinks
      </button>
      { favoriteRecipes && filterFavoriteRecipesType(filter, favoriteRecipes)
        .map((recipe, index) => (
          <FavoriteRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        )) }
    </div>
  );
}
