import React from 'react';
import PropTypes from 'prop-types';

function MealCard(props) {
  const { index, meals } = props;
  console.log(meals);
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        data-testid={ `${index}-card-img` }
        alt={ meals.strMeal }
        src={ meals.strMealThumb }
      />
      <p data-testid={ `${index}-card-name` }>{ meals.strMeal }</p>
    </div>
  );
}

export default MealCard;

MealCard.propTypes = {
  index: PropTypes.number,
  meals: PropTypes.objectOf(PropTypes.array),
}.isRequired;
