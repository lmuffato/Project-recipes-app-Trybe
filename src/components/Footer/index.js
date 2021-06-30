import React from 'react';
import { Link } from 'react-router-dom';
import foodIcon from '../../images/mealIcon.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

import './style.css';

export default function FooterMenu() {
  return (
    <div data-testid="footer" className="footer">
      <Link data-testid="drinks-bottom-btn" to="/bebidas">
        <img src={ drinkIcon } alt="glass icon" />
      </Link>
      <Link data-testid="explore-bottom-btn" to="/explorar">
        <img src={ searchIcon } alt="compass icon" />
      </Link>
      <Link data-testid="food-bottom-btn" to="/comidas">
        <img src={ foodIcon } alt="meal icon" />
      </Link>
    </div>
  );
}
