import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
// import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/ReceitasFavoritas.css';

const copy = require('clipboard-copy');

function ReceitasFavoritasCard({ props: { recipe, index } }) {
  // const [favoriteRecipe, setFavoriteRecipe] = useState(true);
  const history = useHistory();

  const { area, alcoholicOrNot, category, name, image, type } = recipe;

  const shareClick = (e) => {
    e.preventDefault();
    const { location: { pathname } } = history;

    copy(`http://localhost:3000${pathname}`);
    // setClipboardStatus('copied');
  };

  const favoriteClick = (e) => {
    e.preventDefault();

    // const favoriteRecipe = {
    //   id,
    //   type: 'bebida',
    //   area: '',
    //   category: acctualyDrink.drinks[0].strCategory,
    //   alcoholicOrNot: acctualyDrink.drinks[0].strAlcoholic,
    //   name: acctualyDrink.drinks[0].strDrink,
    //   image: acctualyDrink.drinks[0].strDrinkThumb,
    // };

    // if (JSON.parse(localStorage.getItem('favoriteRecipes') !== null)) {
    //   const oldRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    //   console.log(oldRecipes);

    //   const newRecipes = [...oldRecipes, favoriteRecipe];

    //   console.log('New Recipe', newRecipes);
    //   localStorage.setItem('favoriteRecipes', JSON.stringify(newRecipes));
    // } else {
    //   localStorage.setItem('favoriteRecipes', JSON.stringify([favoriteRecipe]));
    // }

    // return !favoriteDrink ? setFavoriteDrink(true) : setFavoriteDrink(false);
  };

  const createButtons = () => {
    console.log('recipe');
    return (
      <div>
        <button
          type="button"
          onClick={ shareClick }
        >
          <img
            alt="Share link"
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
          />
        </button>
        <button type="button" onClick={ favoriteClick }>
          <img
            alt="Favorite button"
            data-testid={ `${index}-horizontal-favorite-btn` }
            src={ blackHeartIcon }
          />
        </button>
      </div>
    );
  };
  console.log(recipe, index);

  const foodSpecs = () => (
    <span
      data-testid={ `${index}-horizontal-top-text` }
    >
      { `${area} - ${category}` }
    </span>
  );

  const drinkSpecs = () => (
    <span data-testid={ `${index}-horizontal-top-text` }>{ alcoholicOrNot }</span>
  );

  return (
    <>
      <div>
        <button type="button" data-testid="filter-by-all-btn">All</button>
        <button type="button" data-testid="filter-by-food-btn">Food</button>
        <button type="button" data-testid="filter-by-drink-btn">Drinks</button>
      </div>
      <main>
        <img
          alt="Receita Favoritada"
          src={ image }
          className="img-card-favorite"
          data-testid={ `${index}-horizontal-image` }
        />
        <div>
          { type === 'comida'
            ? foodSpecs()
            : drinkSpecs() }
          <span data-testid={ `${index}-horizontal-name` }>{ name }</span>
          { createButtons() }
        </div>
      </main>
    </>
  );
}

ReceitasFavoritasCard.propTypes = {
  props: PropTypes.object,
}.isRequired;

export default ReceitasFavoritasCard;
