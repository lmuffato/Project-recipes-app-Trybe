import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer data-testid="footer">
      <Link to="/bebidas" data-testid="drinks-bottom-btn">
        <img src="src/images/drinkIcon.svg" alt="drink-icon" />
      </Link>
      <Link to="/explorar" data-testid="explore-bottom-btn">
        <img src="src/images/exploreIcon.svg" alt="explore-icon" />
      </Link>
      <Link to="/comidas" data-testid="food-bottom-btn">
        <img src="src/images/mealIcon.svg" alt="food-icon" />
      </Link>
    </footer>
  );
}

export default Footer;
