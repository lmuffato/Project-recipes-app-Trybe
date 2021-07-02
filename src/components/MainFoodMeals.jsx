import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

function RandomMeals() {
  const data = useSelector((state) => state.searchReducer.initialMeals);
  const renderCategories = () => (
    data.map((e, index) => index < 12 && (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img
          src={ e.strMealThumb }
          alt="category thumb"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{e.strMeal}</span>
      </div>
    ))
  );

  return (
    <div>
      { renderCategories() }
    </div>
  );
}

export default RandomMeals;
