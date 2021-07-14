import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import clipboardCopy from '../services/clipboardCopy';
import shareIcon from '../images/shareIcon.svg';

function doneRecipeCard({ recipe, index }) {
  const {
    id, image, category, name, doneDate, tags, type, area, alcoholicOrNot } = recipe;
  return (
    <div
      style={ {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100vw',
        alignItems: 'center' } }
    >
      <Link to={ `${type}s/${id}` }>
        <img
          src={ image }
          alt="Done Recipe"
          style={ { width: '80vw' } }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      { (type === 'bebida') ? (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { alcoholicOrNot }
        </p>
      ) : (
        <p
          data-testid={ `${index}-horizontal-top-text` }
        >
          { `${area} - ${category}` }
        </p>
      ) }
      <Link to={ `${type}s/${id}` }>
        <p
          data-testid={ `${index}-horizontal-name` }
        >
          { name }
        </p>
      </Link>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { doneDate }
      </p>
      <button
        type="button"
        onClick={ () => clipboardCopy(type, id) }
      >
        <img
          src={ shareIcon }
          alt="Share Icon"
          data-testid={ `${index}-horizontal-share-btn` }
        />
        <span id={ `copyMessage${id}` }>Compartilhar</span>
      </button>
      { tags && tags.map((tag) => (
        <p
          key={ index }
          data-testid={ `${index}-${tag}-horizontal-tag` }
        >
          { tag }
        </p>
      ))}
    </div>
  );
}

doneRecipeCard.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default doneRecipeCard;
