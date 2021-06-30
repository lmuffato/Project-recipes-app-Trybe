import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

export default function FoodCard({ food, index, place }) {
  const objectTranslation = {
    meal: 'Meal',
    cocktail: 'Drink',
  };
  return (
    <div className="food-card" data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        src={ food[`str${objectTranslation[place]}Thumb`] }
        alt="food"
      />
      <h1 data-testid={ `${index}-card-name` }>
        { food[`str${objectTranslation[place]}`] }
      </h1>
    </div>
  );
}

FoodCard.propTypes = {
  index: PropTypes.number,
  place: PropTypes.string,
  food: PropTypes.shape({
    strThumb: PropTypes.string,
    strFood: PropTypes.string,
  }),
}.isRequired;
