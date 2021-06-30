import React from 'react';
import { Link } from 'react-router-dom';
import foodIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function FooterMenu() {
  return (
    <div data-testid="footer">
      <Link data-testid="drinks-bottom-btn" to="/bebidas">{ drinkIcon }</Link>
      <Link data-testid="explore-bottom-btn" to="/explorar">{ searchIcon }</Link>
      <Link data-testid="food-bottom-btn" to="/comidas">{ foodIcon }</Link>
    </div>
  );
}
