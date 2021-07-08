import React from 'react';
import { Link } from 'react-router-dom';
import DrinkIcon from '../../images/drinkIcon.svg';

export default function DrinksBtn() {
  return (
    <div>
      <Link to="/bebidas">
        <img src={ DrinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
      </Link>
    </div>
  );
}
