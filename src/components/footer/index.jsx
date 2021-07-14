import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { BiDrink, BiCompass, BiRestaurant } from 'react-icons/bi';
import styles from './styles.module.scss';

function Footer() {
  const { location: { pathname } } = useHistory();
  return (
    <nav className={ styles.footer } data-testid="footer">
      <Link
        to="/bebidas"
        className={ `${styles.icons} ${pathname === '/bebidas' && styles.active}` }
      >
        <BiDrink data-testid="drinks-bottom-btn" src="drinkIcon" />
      </Link>
      <Link
        to="/explorar"
        className={ `${styles.icons} ${pathname === '/explorar' && styles.active}` }
      >
        <BiCompass data-testid="explore-bottom-btn" src="exploreIcon" />
      </Link>
      <Link
        to="/comidas"
        className={ `${styles.icons} ${pathname === '/comidas' && styles.active}` }
      >
        <BiRestaurant data-testid="food-bottom-btn" src="mealIcon" />
      </Link>
    </nav>
  );
}

export default Footer;
