import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, shape, string } from 'prop-types';

function MealsCards({ meals }) {
  return (
    <div className="meals-container">
      {meals.map((meal, index) => (
        <Link
          data-testid={ `${index}-recipe-card` }
          key={ meal.idMeal }
          to={ `/comidas/${meal.idMeal}` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ meal.strMealThumb }
            alt={ meal.strMeal }
            width="100"
            height="100"
          />
          <div data-testid={ `${index}-card-name` }>{meal.strMeal}</div>
        </Link>
      ))}
    </div>
  );
}

MealsCards.propTypes = {
  meals: arrayOf(
    shape(
      { idMeal: string,
        strMeal: string,
        strMealThumb: string },
    ),
  ).isRequired,
};

export default MealsCards;
