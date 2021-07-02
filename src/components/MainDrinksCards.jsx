import React from 'react';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

function RandomDrinks() {
  const data = useSelector((state) => state.searchReducer.initialDrinks);
  const TWELVE = 12;
  const renderDrinks = () => (
    data.map((e, index) => index < TWELVE && (
      <div key={ index } data-testid={ `${index}-recipe-card` }>
        <img
          src={ e.strDrinkThumb }
          alt="category thumb"
          data-testid={ `${index}-card-img` }
        />
        <span data-testid={ `${index}-card-name` }>{e.strDrink}</span>
      </div>
    ))
  );

  return (
    <div>
      { renderDrinks() }
    </div>
  );
}

export default RandomDrinks;
