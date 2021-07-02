import React from 'react';
import { Link } from 'react-router-dom';
import { arrayOf, shape, string } from 'prop-types';

function DrinksCards({ drinks }) {
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

DrinksCards.propTypes = {
  drinks: arrayOf(
    shape(
      { idDrink: string,
        strDrink: string,
        strDrinkThumb: string },
    ),
  ).isRequired,
};

export default DrinksCards;
