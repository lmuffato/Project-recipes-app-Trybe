import React/* , { useContext, useState } */ from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// import RecipeContext from '../context/RecipeContext';
import clipboardCopy from '../services/clipboardCopy';
import shareIcon from '../images/shareIcon.svg';
import favoriteIcon from '../images/blackHeartIcon.svg';

function FavoriteRecipeCard({ recipe, index }) {
  // const { favoriteRecipes } = useContext(RecipeContext);
  // const [ newFavoriteRecipes, setFavoriteRecipes] = useState(favoriteRecipes);
  // console.log(`Receitas favoritas: ${favoriteRecipes}` );
  const {
    id, image, category, name, type, area, alcoholicOrNot } = recipe;
  function removeFavorite(favoriteID) {
    const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const deleteFavoriteIndex = favoriteRecipes
      .map((favRecipe) => favRecipe.id).indexOf({ favoriteID });
    favoriteRecipes.splice(deleteFavoriteIndex, 1);
    console.log(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }
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
          alt="Favorite Recipe"
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
      <button
        type="button"
        onClick={ () => removeFavorite(id) }
      >
        <img
          src={ favoriteIcon }
          alt="Favorite Icon"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      </button>
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  recipe: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default FavoriteRecipeCard;
