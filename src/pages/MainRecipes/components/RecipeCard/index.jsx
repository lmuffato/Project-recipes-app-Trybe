import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard({ meals }) {
  return (
    <>
      {meals.map((meal, index) => (
        <div key={ meal.idMeal || meal.idDrink } data-testid={ `${index}-recipe-card` }>
          <h1 data-testid={ `${index}-card-name` }>{meal.strMeal || meal.strDrink}</h1>
          <img
            src={ meal.strMealThumb || meal.strDrinkThumb }
            alt={ meal.strMeal || meal.strDrink }
            data-testid={ `${index}-card-img` }
          />
        </div>
      ))}
    </>
  );
}

RecipeCard.propTypes = {
  meals: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default RecipeCard;
