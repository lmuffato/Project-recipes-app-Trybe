import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function DrinksCards() {
  const drinks = useSelector((state) => state.drinks.recipes);

  return (
    <div className="drinks-container">
      {drinks.map((drink, index) => (
        <Link
          data-testid={ `${index}-recipe-card` }
          key={ drink.idDrink }
          to={ `/bebidas/${drink.idDrink}` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ drink.strDrinkThumb }
            alt={ drink.strDrink }
            width="100"
            height="100"
          />
          <div data-testid={ `${index}-card-name` }>{drink.strDrink}</div>
        </Link>
      ))}
    </div>
  );
}

export default DrinksCards;
