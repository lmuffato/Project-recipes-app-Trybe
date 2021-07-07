import React from 'react';
import PropTypes from 'prop-types';

// import CardContainer from './styles';

function FavoriteRecipeCard(props) {
  const { recipe, index } = props;

  return (
    <div key={ index }>
      <img
        data-testid={ `${index}-horizontal-image` }
        style={ { maxWidth: '100px' } }
        src={ recipe.image }
        alt="Delicious food/drink"
      />
      <span data-testid={ `${index}-horizontal-top-text` }>
        { recipe.category }
      </span>
      <span data-testid={ `${index}-horizontal-name` }>
        { recipe.name }
      </span>
      <button type="button" data-testid={ `${index}-horizontal-share-btn` }>
        Share
      </button>
      <button type="button" data-testid={ `${index}-horizontal-favorite-btn` }>
        Favorite
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default FavoriteRecipeCard;
