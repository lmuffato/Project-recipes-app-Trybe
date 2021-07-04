import React from 'react';
import PropTypes from 'prop-types';

function Cards({ el, index, path }) {
  const verifyPath = String(path).includes('comidas');

  return (
    <div
      className="card-meal-drink"
      data-testid={ `${index}-recipe-card` }
    >
      <img
        src={ verifyPath ? el.strMealThumb : el.strDrinkThumb }
        alt={ verifyPath ? 'Food' : 'Drink' }
        width="100%"
        data-testid={ `${index}-card-img` }
      />
      <p
        className="card-name"
        data-testid={ `${index}-card-name` }
      >
        { verifyPath ? el.strMeal : el.strDrink }
      </p>
    </div>
  );
}

Cards.propTypes = {
  el: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
};

export default Cards;
