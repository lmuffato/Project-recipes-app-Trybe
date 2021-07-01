import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function MealsCards() {
  const meals = useSelector((state) => state.meals.recipes);

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

export default MealsCards;
