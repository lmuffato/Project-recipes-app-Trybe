import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="drinks" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="explore" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="food" />
      </Link>
    </footer>
  );
}

export default Footer;
