import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const Footer = () => (
  <footer data-testid="footer">
    <Link to="/bebidas">
      <button type="button">
        <img src={ drinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
      </button>
    </Link>
    <Link to="/explorar">
      <button type="button">
        <img src={ exploreIcon } alt="Explore icon" data-testid="explore-bottom-btn" />
      </button>
    </Link>
    <Link to="/comidas">
      <button type="button">
        <img src={ mealIcon } alt="Food icon" data-testid="food-bottom-btn" />
      </button>
    </Link>
  </footer>
);

export default Footer;
