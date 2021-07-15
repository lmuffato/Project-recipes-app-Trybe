import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import '../styles/MealDescription.css';
import '../styles/MainRecipes.css';

function DrinkCards({ data }) {
  console.log('render');
  // const { idDrink, strDrinkThumb, strDrink } = data;
  return (
    data.map((recipe, index) => {
      const { idDrink, strDrink, strDrinkThumb } = recipe;
      return (
        <Link
          to={ `/bebidas/${idDrink}` }
          className="recipe"
          data-testid={ `${index}-recipe-card` }
          key={ index }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ strDrinkThumb }
            alt="Drink"
            className="recipe-image"
          />
          <p className="recipe-title" data-testid={ `${index}-card-name` }>{strDrink}</p>
        </Link>
      );
    })
  );
}

DrinkCards.propTypes = {
  data: PropTypes.shape({}),
}.isRequired;

export default DrinkCards;
