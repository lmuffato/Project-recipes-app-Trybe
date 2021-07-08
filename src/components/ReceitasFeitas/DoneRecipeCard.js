import React from 'react';
import PropTypes from 'prop-types';

import ShareButton from '../ShareButton';

import '../../style/DoneRecipeCard.css';

export default function DoneRecipeCard({ recipe, index }) {
  const isFood = recipe.type === 'comida';
  console.log(recipe);
  return (
    <div className="done-recipe-card">
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      {isFood ? (
        <span data-testid={ `${index}-horizontal-top-text` }>
          {`${recipe.area} - ${recipe.category}`}
        </span>
      ) : (
        <span data-testid={ `${index}-horizontal-top-text` }>
          {recipe.alcoholicOrNot}
        </span>
      )}
      <div data-testid={ `${index}-horizontal-share-btn` }>
        <ShareButton recipeId={ recipe.id } isFood={ isFood } />
      </div>
      <p data-testid={ `${index}-horizontal-name` }>
        {recipe.name}
      </p>
      <p data-testid={ `${index}-horizontal-done-date` }>
        {JSON.stringify(recipe.doneDate)}
      </p>
      {recipe.tags && recipe.tags
        .slice(0, 2)
        .map((tag, i) => (
          <p
            key={ i }
            data-testid={ `${index}-${tag}-horizontal-tag` }
          >
            {tag}
          </p>
        )) }
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({}),
  index: PropTypes.number,
}.isRequired;
