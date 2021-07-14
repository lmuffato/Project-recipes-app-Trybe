import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import handleCopyToClipboard from '../../utils/handleCopyToClipboard';

function DoneRecipeCard(props) {
  const { recipe, index, handleRemoveRecipe, setCopiedToClipboard } = props;
  const detailsUrl = recipe.type === 'comida' ? `/comidas/${recipe.id}`
    : `/bebidas/${recipe.id}`;

  return (
    <div key={ index }>
      <Link to={ detailsUrl }>
        <img
          data-testid={ `${index}-horizontal-image` }
          style={ { maxWidth: '100px' } }
          src={ recipe.image }
          alt="Delicious food/drink"
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        { recipe.type === 'comida' && `${recipe.area} - ` }
        { recipe.alcoholicOrNot === 'Alcoholic' && 'Alcoholic - ' }
        { recipe.category }
      </p>
      <Link to={ detailsUrl }>
        <p data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </p>
      </Link>
      <p data-testid={ `${index}-horizontal-done-date` }>{ recipe.doneDate }</p>
      <button
        type="button"
        onClick={ () => handleCopyToClipboard(detailsUrl, setCopiedToClipboard) }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="share-btn"
        />
      </button>
      <button type="button" onClick={ () => handleRemoveRecipe(index) }>
        <img
          data-testid={ `${index}-horizontal-favorite-btn` }
          src={ blackHeartIcon }
          alt="share-btn"
        />
      </button>
      <ul>
        { recipe.tags.map(
          (tag, i) => (
            <li key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
              { tag }
            </li>),
        ) }
      </ul>
    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape(),
  handleRemoveRecipe: PropTypes.func,
  setCopiedToClipboard: PropTypes.func,
}.isRequired;

export default DoneRecipeCard;