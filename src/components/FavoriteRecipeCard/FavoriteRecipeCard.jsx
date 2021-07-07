import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';

// import CardContainer from './styles';

function FavoriteRecipeCard(props) {
  const { recipe, index, handleRemoveRecipe } = props;
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
      <button type="button">
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
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape(),
  handleRemoveRecipe: PropTypes.func,
}.isRequired;

export default FavoriteRecipeCard;
