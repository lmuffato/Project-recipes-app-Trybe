import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FavoritedRecipesButton from './FavoritedRecipesButton';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function FavoriteRecipeCard({ imgSrc, imgId, category, categoryId,
  nameId, mealName, shareId, area, alcoholic, recipeId, type, indexCard }) {
  const [copyLink, setCopyLink] = useState(false);

  const shareClick = () => {
    copy(`http://localhost:3000/${type}s/${recipeId}`);
    setCopyLink(true);
  };

  return (
    <div className="cardRecipeFavorited">
      <div>
        <Link to={ `/${type}s/${recipeId}` }>
          <img
            src={ imgSrc }
            alt="Done Recipe Card"
            data-testid={ imgId }
            className="imgRecipeFinished"
          />
        </Link>
      </div>
      <div>
        {area !== '' ? (
          <h4 data-testid={ categoryId }>{ `${area} - ${category}` }</h4>
        ) : (<h4 data-testid={ categoryId }>{ category }</h4>)}
        {alcoholic !== '' ? (<h4 data-testid={ categoryId }>{ alcoholic }</h4>) : (null)}
        <Link to={ `/${type}s/${recipeId}` }>
          <h3 data-testid={ nameId }>{ mealName }</h3>
        </Link>
        <button type="button" onClick={ shareClick } className="shareButton">
          <img data-testid={ shareId } src={ shareIcon } alt="compartilhar" />
        </button>
        <FavoritedRecipesButton
          elementId={ recipeId }
          favoriteId={ `${indexCard}-horizontal-favorite-btn` }
        />
        {copyLink ? <span>Link copiado!</span> : null}
      </div>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  imgSrc: PropTypes.string,
  imgId: PropTypes.string,
  category: PropTypes.string,
  categoryId: PropTypes.string,
  nameId: PropTypes.string,
  dateId: PropTypes.string,
}.isRequired;

export default FavoriteRecipeCard;
