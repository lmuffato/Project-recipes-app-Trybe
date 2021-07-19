import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import handleCopyToClipboard from '../../utils/handleCopyToClipboard';
import DoneRecipeCardContainer from './styles';

function DoneRecipeCard(props) {
  const { recipe, index, handleRemoveRecipe, setCopiedToClipboard } = props;
  const detailsUrl = recipe.type === 'comida' ? `/comidas/${recipe.id}`
    : `/bebidas/${recipe.id}`;

  return (
    <DoneRecipeCardContainer key={ index }>
      <Link to={ detailsUrl }>
        <div className="img-wrapper">
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="Delicious food/drink"
          />
        </div>
      </Link>
      <div className="recipe-info">
        <div className="category">
          <p data-testid={ `${index}-horizontal-top-text` }>
            { recipe.type === 'comida' && `${recipe.area} - ` }
            { recipe.alcoholicOrNot === 'Alcoholic' && 'Alcoholic - ' }
            { recipe.category }
          </p>
        </div>
        <Link to={ detailsUrl }>
          <p data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </p>
        </Link>
        <div className="icons-grid">
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
        </div>
        { recipe.tags !== null && (
          <ul className="tag">
            {recipe.tags.map(
              (tag, i) => (
                <li key={ i } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  { tag }
                </li>),
            ) }
          </ul>
        )}
      </div>
    </DoneRecipeCardContainer>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape(),
  handleRemoveRecipe: PropTypes.func,
  setCopiedToClipboard: PropTypes.func,
}.isRequired;

export default DoneRecipeCard;
