import React, { useState } from 'react';
import Header from '../../components/Header';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

import './style.css';

export default function FavoriteRecipes() {
  const storageFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const [copyButton, setCopyButton] = useState(false);

  const handleClick = ({ target }) => {
    const { alt } = target;
    setCopyButton(true);
    const path = `http://localhost:3000${alt}`;
    navigator.clipboard.writeText(path);
  };

  /* Source: https://github.com/tryber/sd-09-project-recipes-app/tree/524b096830480588272f95f19414d77636fb705f */
  const isFood = ({ id, image, type, name, category, area, alcoholicOrNot }, index) => {
    if (type === 'comida') {
      return (
        <div key={ id }>
          { copyButton ? <span>Link copiado!</span> : null }

          <span data-testid={ `${index}-horizontal-top-text` }>
            { `${area} - ${category}` }
          </span>

          <img
            src={ image }
            alt="comida"
            data-testid={ `${index}-horizontal-image` }
          />

          <span data-testid={ `${index}-horizontal-name` }>
            { name }
          </span>

          <button type="button" onClick={ handleClick }>
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt={ `/${type}s/${id}` }
            />
          </button>

          <button type="button">
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="favorite"
            />
          </button>
        </div>
      );
    }
    return (
      <div key={ type }>
        <button type="button" onClick={ handleClick }>
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt={ `${type}s/${id}` }
          />
        </button>

        <button type="button">
          <img
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
            alt="favorite"
          />
        </button>

        { copyButton ? <span>Link copiado!</span> : null }

        <img src={ image } alt="bebida" data-testid={ `${index}-horizontal-image` } />

        <span data-testid={ `${index}-horizontal-top-text` }>
          { alcoholicOrNot }
        </span>

        <span data-testid={ `${index}-horizontal-name` }>
          { name }
        </span>
      </div>
    );
  };

  return (
    <div>
      <Header title="Receitas Favoritas" />
      <div className="buttons">
        <button
          type="button"
          className="button-favorite"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          className="button-favorite"
          data-testid="filter-by-food-btn"
        >
          Food
        </button>
        <button
          type="button"
          className="button-favorite"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>

      {storageFavorite.map(
        ({ id, image, type, name, category, area, alcoholicOrNot }, index) => (
          isFood({ id, image, type, name, category, area, alcoholicOrNot }, index)
        ),
      )}
    </div>
  );
}
