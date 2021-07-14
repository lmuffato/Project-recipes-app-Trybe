import React from 'react';
import { Link } from 'react-router-dom';
import { BiDrink, BiCompass, BiRestaurant } from 'react-icons/bi';
import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={ styles.footer } data-testid="footer">
      <Link to="/bebidas" className={ styles.icons }>
        <BiDrink data-testid="drinks-bottom-btn" src="drinkIcon" />
      </Link>
      <Link to="/explorar" className={ styles.icons }>
        <BiCompass data-testid="explore-bottom-btn" src="exploreIcon" />
      </Link>
      <Link to="/comidas" className={ styles.icons }>
        <BiRestaurant data-testid="food-bottom-btn" src="mealIcon" />
      </Link>
    </footer>
  );
}

export default Footer;
