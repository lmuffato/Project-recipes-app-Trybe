import React from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  // const getFavorites = localStorage.getItem('favoriteRecipes');

  const setMealOrDrink = ({ id, type, area, category, alcoholicOrNot, name, image }, index) => {
    if (type === 'comida') {
      return (
        <div>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `${name} recipe` }
          />

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>

          <button type="button">
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `share ${name}` }
            />
          </button>

          <button type="button">
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ `unfavorite ${name}` }
            />
          </button>
        </div>
      );
    } else {
      return (
        <div>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `${name} recipe` }
          />

          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>

          <span data-testid={ `${index}-horizontal-top-text` }>
            { alcoholicOrNot }
          </span>

          <button type="button">
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `share ${name}` }
            />
          </button>

          <button type="button">
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt={ `unfavorite ${name}` }
            />
          </button>
        </div>
      );
    }
  }

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      {/* {
        getFavorites.map(({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
          setMealOrDrink({ id, type, area, category, alcoholicOrNot, name, image }, index)
        ))
      } */}
    </div>
  );
}

export default FavoriteRecipes;
