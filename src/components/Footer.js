import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../footer.module.css';

function Footer() {
  return <div data-testid="footer" className={ styles.footer__position }>
    <Link to="/bebidas">
    <img src={ drinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
    </Link>
    <Link to="/explorar">
    <img src={ exploreIcon } alt="Explore icon" data-testid="explore-bottom-btn" />
    </Link>
    <Link to="/comidas">
    <img src={ mealIcon } alt="Meal icon" data-testid="food-bottom-btn" />
    </Link>
    </div>;
}

export default Footer;
