import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import shareIcon from '../../images/shareIcon.svg';
import styles from './styles.module.scss';

function HorizontalRecipeCard({ recipe, index }) {
  const [copiedLink, setCopiedLink] = useState(false);

  function copyLink() {
    copy(`http://localhost:3000/${recipe.type}s/${recipe.id}`);
    setCopiedLink(true);
  }

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
        <p data-testid={ `${index}-horizontal-done-date` }>
          { `Feito em: ${recipe.doneDate}` }
        </p>
        { recipe.tags.map((tag) => (tag !== '') && (
          <span
            data-testid={ `${index}-${tag}-horizontal-tag` }
            key={ `${index}-${tag}-horizontal-tag` }
          >
            { tag }
          </span>
        )) }
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

HorizontalRecipeCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    area: PropTypes.string,
    type: PropTypes.string,
    doneDate: PropTypes.string,
    alcoholicOrNot: PropTypes.bool,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default HorizontalRecipeCard;
