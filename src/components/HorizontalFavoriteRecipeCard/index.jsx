import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import blackHeart from '../../images/blackHeartIcon.svg';
import styles from './styles.module.scss';

function HorizontalFavoriteRecipeCard({ recipe, index }) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [removeFavorite, setRemoveFavorite] = useState('favoriteRecipes');

  function copyLink() {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopiedLink(true);
  }

  const removeFavorites = () => {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem(removeFavorite));
    setRemoveFavorite(favoriteRecipesStorage);
  };

  return (
    <div className={ styles.card } key={ `${recipe.id}` }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          src={ recipe.image }
          alt={ recipe.name }
          className="recipe-image"
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <div className="done-recipe-text-container">
        <p data-testid={ `${index}-horizontal-top-text` }>
          { (recipe.type === 'comida') ? (`${recipe.area} - ${recipe.category}`) : (
            `${recipe.alcoholicOrNot}`
          ) }
        </p>
        <Link to={ `/${recipe.type}s/${recipe.id}` }>
          <h4 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h4>
        </Link>
      </div>
      <div className="share-btn-container">
        <button
          type="button"
          className="share-btn"
          onClick={ removeFavorites }
        >
          <img
            src={ blackHeart }
            alt="Desfavoritar"
            data-testid={ `${index}-horizontal-favorite-btn` }
          />
        </button>
      </div>
      <div className="share-btn-container">
        <button
          type="button"
          className="share-btn"
          onClick={ copyLink }
        >
          <img
            src={ shareIcon }
            alt="Compartilhar"
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>
        { copiedLink && (
          <span>
            Link copiado!
          </span>
        ) }
      </div>
    </div>
  );
}

HorizontalFavoriteRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    alcoholicOrNot: PropTypes.bool,
  }).isRequired,
};

export default HorizontalFavoriteRecipeCard;
