import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import ShareButton from '../ShareButton';

import '../../style/DoneRecipeCard.css';
import zipName from '../Main/Helpers';

export default function DoneRecipeCard({ recipe, index }) {
  const isFood = recipe.type === 'comida';
  const numOfCharacters = 12;

  return (
    <div className="done-recipe-card">
      <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${recipe.id}` }>
        <img
          id="header-image"
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="done-recipe-info">
        <div className="horizontal-top-text">
          <span data-testid={ `${index}-horizontal-top-text` }>
            {isFood ? `${recipe.area} - ${recipe.category}` : recipe.alcoholicOrNot}
          </span>
          <ShareButton
            recipeId={ recipe.id }
            isFood={ isFood }
            index={ index }
          />
        </div>
        <Link to={ `/${isFood ? 'comidas' : 'bebidas'}/${recipe.id}` }>
          <p data-testid={ `${index}-horizontal-name` }>
            { zipName(recipe.name, numOfCharacters)}
          </p>
        </Link>
        <p data-testid={ `${index}-horizontal-done-date` }>
          {recipe.doneDate}
        </p>
        {recipe.tags && recipe.tags
          .slice(0, 2)
          .map((tag, i) => (
            <span
              key={ i }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          )) }
      </div>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
