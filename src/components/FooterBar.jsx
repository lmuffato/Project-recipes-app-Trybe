import React from 'react';
import { Link } from 'react-router-dom';
import '../styleSheets/FooterBar.css';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function FooterBar() {
  return (
    <footer data-testid="footer" className="footer-bar">
      <Link to="/bebidas">
        <img
          src={ drinkIcon }
          alt="icon of drink page"
          data-testid="drinks-bottom-btn"
          className="footer-icon"
        />
      </Link>
      <Link to="/explorar">
        <img
          src={ exploreIcon }
          alt="icon of explore page"
          data-testid="explore-bottom-btn"
          className="footer-icon"
        />
      </Link>
      <Link to="/comidas">
        <img
          src={ mealIcon }
          alt="icon of drink page"
          data-testid="food-bottom-btn"
          className="footer-icon"
        />
      </Link>
    </footer>
  );
}

export default FooterBar;
