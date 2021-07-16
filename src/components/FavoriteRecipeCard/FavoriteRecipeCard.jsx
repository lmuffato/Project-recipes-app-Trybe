import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import handleCopyToClipboard from '../../utils/handleCopyToClipboard';
import FavRecipeCardContainer from './styles';

// import CardContainer from './styles';

function FavoriteRecipeCard(props) {
  const { recipe, index, handleRemoveRecipe, setCopiedToClipboard } = props;
  const detailsUrl = recipe.type === 'comida' ? `/comidas/${recipe.id}`
    : `/bebidas/${recipe.id}`;

  return (
    <FavRecipeCardContainer key={ index }>
      <Link to={ detailsUrl }>
        <div className="img-wrapper">
          <img
            className="img-banner"
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="Delicious food/drink"
          />
        </div>
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
    </FavRecipeCardContainer>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape(),
  handleRemoveRecipe: PropTypes.func,
  setCopiedToClipboard: PropTypes.func,
}.isRequired;

export default FavoriteRecipeCard;
