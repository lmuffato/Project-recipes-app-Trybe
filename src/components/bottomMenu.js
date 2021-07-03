import React from 'react';
import { Link } from 'react-router-dom';
import '../componentsStyles/Bottom Menu/bottomMenu.css';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function bottomMenu() {
  return (
    <div className="bottom" data-testid="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          alt="drinks btn"
          src={ drinkIcon }
        />
      </Link>

      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          alt="explore btn"
          src={ exploreIcon }
        />
      </Link>

      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          alt="meals btn"
          src={ mealIcon }
        />
      </Link>
    </div>
  );
}

export default bottomMenu;
