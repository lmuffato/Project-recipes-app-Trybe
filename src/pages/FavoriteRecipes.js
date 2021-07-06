import React from 'react';

function FavoriteRecipes({ index, thumbnail, name, area, category }) {
  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      <img
        data-testid={ `${index}-horizontal-image` }
        src={ thumbnail }
        alt={ `${name} recipe` }
      />

      <span data-testid={ `${index}-horizontal-top-text` }>
        { `${area} - ${category}` }
      </span>

      <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
    </div>
  );
}

export default FavoriteRecipes;
