import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import exploreIcon from '../images/exploreIcon.png';
import drinkIcon from '../images/drinkIcon.png';
import mealIcon from '../images/mealIcon.png';

function bottomMenu() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/bebidas">
        <img
          data-testid="drinks-bottom-btn"
          alt="drinks btn"
          src={ drinkIcon }
          width="40px"
        />
      </Link>

      <Link to="/explorar">
        <img
          data-testid="explore-bottom-btn"
          alt="explore btn"
          src={ exploreIcon }
          width="40px"
        />
      </Link>

      <Link to="/comidas">
        <img
          data-testid="food-bottom-btn"
          alt="meals btn"
          src={ mealIcon }
          width="40px"
        />
      </Link>
    </div>
  );
}

export default bottomMenu;
