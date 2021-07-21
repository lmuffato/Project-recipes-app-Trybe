import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Footer() {
  return (
    <footer className="footer-menu" data-testid="footer">
      <Link to="/bebidas" className="footer-links">
        <img
          src={ drinkIcon }
          alt="Drink icon"
          data-testid="drinks-bottom-btn"
          className="footer-btn"
        />
      </Link>
      <Link to="/explorar" className="footer-links">
        <img
          src={ exploreIcon }
          alt="Explore icon"
          data-testid="explore-bottom-btn"
          className="footer-btn"
        />
      </Link>
      <Link to="/comidas" className="footer-links">
        <img
          src={ mealIcon }
          alt="Meal icon"
          data-testid="food-bottom-btn"
          className="footer-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
