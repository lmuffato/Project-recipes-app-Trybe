import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function InferiorMenu() {
  return (
    <footer className="footer" data-testid="footer">
      <Link src={ drinkIcon } data-testid="drinks-bottom-btn" to="/bebidas">
        <img src={ drinkIcon } alt="Drinks" />
      </Link>

      <Link src={ exploreIcon } data-testid="explore-bottom-btn" to="/explorar">
        <img src={ exploreIcon } alt="Explorar" />
      </Link>

      <Link src={ mealIcon } data-testid="food-bottom-btn" to="/comidas">
        <img src={ mealIcon } alt="Comidas" />
      </Link>

    </footer>
  );
}

export default InferiorMenu;
