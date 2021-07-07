import React, { useState, useEffect } from 'react';

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
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            style={ { maxWidth: '100px' } }
            src={ recipe.image }
            alt="Delicious food/drink"
          />
          <span data-testid={ `${index}-horizontal-top-text` }>
            { recipe.category }
          </span>
          <span data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </span>
          <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
            Share
          </button>
          <button type="button" data-testid={ `${index}-horizontal-favorite-btn` }>
            Favorite
          </button>
        </div>
      )) }

      {
        /*
          cy.get('[data-testid="0-horizontal-image"]');
          cy.get('[data-testid="0-horizontal-top-text"]');
          cy.get('[data-testid="0-horizontal-name"]');
          cy.get('[data-testid="0-horizontal-share-btn"]');
          cy.get('[data-testid="0-horizontal-favorite-btn"]');
         */
      }
    </div>
  );
}

export default FavoriteRecipes;
