import React, { useState, useEffect } from 'react';
import FavoriteRecipeCard from '../components/FavoriteRecipeCard/FavoriteRecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [filterByType, setFilterByType] = useState('All');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) setFavoriteRecipes(favoriteStorage);
  }, []);

  function filterRecipesByType(recipes, filter) {
    if (filter === 'Food') {
      return recipes.filter((recipe) => recipe.type === 'comida');
    }

    if (filter === 'Drinks') {
      return recipes.filter((recipe) => recipe.type === 'bebida');
    }

    return recipes;
  }

  function handleRemoveRecipe(index) {
    const updatedFavoriteRecipes = favoriteRecipes
      .slice(0, index)
      .concat(favoriteRecipes.slice(index + 1));

    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavoriteRecipes));
    setFavoriteRecipes(updatedFavoriteRecipes);
  }

  if (favoriteRecipes.length === 0) {
    return (
      <div>
        <h2>Você não possui receitas favoritas!</h2>
      </div>
    );
  }

  return (
    <div>
      <h1>Receitas Favoritas</h1>
      { copiedToClipboard && 'Link copiado!' }
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterByType('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterByType('Food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterByType('Drinks') }
        >
          Drinks
        </button>
      </div>
      { filterRecipesByType(favoriteRecipes, filterByType).map((recipe, index) => (
        <FavoriteRecipeCard
          recipe={ recipe }
          index={ index }
          key={ index }
          handleRemoveRecipe={ handleRemoveRecipe }
          setCopiedToClipboard={ setCopiedToClipboard }
        />
      )) }
    </div>
  );
}

export default FavoriteRecipes;
