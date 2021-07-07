import React from 'react';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipeCard({ recipe, index }) {
  console.log(recipe);
  const {
    image, category, name, doneDate, tags, type, area } = recipe;
  return (
    <div>
      <img
        src={ image }
        alt="Done Recipe"
        data-testid={ `${index}-horizontal-image` }
      />
      <p
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${area} - ${category}` }
      </p>
      <p
        data-testid={ `${index}-horizontal-name` }
      >
        { name }
      </p>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneDate }
      </p>
      <img
        src={ shareIcon }
        alt="Share Icon"
        data-testid={ `${index}-horizontal-share-btn` }
      />
      { type === 'comida' && tags.map((tag) => (
        <p
          key={ index }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      )) }
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default DoneRecipeCard;
