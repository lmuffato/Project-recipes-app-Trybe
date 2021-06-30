import React from 'react';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import './Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer">
      <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink icon" />
      <img src={ exploreIcon } data-testid="explore-bottom-btn" alt="explore icon" />
      <img src={ mealIcon } data-testid="food-bottom-btn" alt="food icon" />
    </footer>
  );
}

export default Footer;
