import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const getFavorites = [
    {
      id: 52771,
      type: 'meal',
      area: 'Italian',
      category: 'Vegetarian',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
    {
      id: 178319,
      type: 'cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    },
  ];

  const [isCopy, setIsCopy] = useState(false);

  // const getFavorites = localStorage.getItem('favoriteRecipes');

  const copyToClipboard = ({ target }) => {
    setIsCopy(true);
    const { alt } = target;
    const path = `http://localhost:3000/${alt}`;
    navigator.clipboard.writeText(path);
  };

  const renderFilter = (
    { id, type, area, category, alcoholicOrNot, name, image }, index,
  ) => {
    if (type === 'meal') {
      return (
        <div key={ id }>
          { isCopy ? <p>Link copiado!</p> : null }
          <Link to={ `/comidas/${id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ image }
              alt={ `${name} recipe` }
              width="150px"
            />
          </Link>

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <Link to={ `/comidas/${id}` }>
            <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
          </Link>

          <button type="button" onClick={ copyToClipboard }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `comidas/${id}` }
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
    return (
      <div key={ id }>
        { isCopy ? <p>Link copiado!</p> : null }
        <Link to={ `/bebidas/${id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ image }
            alt={ `${name} recipe` }
            width="150px"
          />
        </Link>

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        <Link to={ `/bebidas/${id}` }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        </Link>

        <button type="button" onClick={ copyToClipboard }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ `bebidas/${id}` }
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
  };

  return (
    <div>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drinks</button>

      {
        getFavorites.map(
          ({ id, type, area, category, alcoholicOrNot, name, image }, index) => (
            renderFilter({ id, type, area, category, alcoholicOrNot, name, image }, index)
          ),
        )
      }
    </div>
  );
}

export default FavoriteRecipes;
