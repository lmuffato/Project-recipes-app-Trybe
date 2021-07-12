import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import exploreIcon from '../../images/exploreIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import styles from './styles.module.scss';

function Footer() {
  return (
    <footer className={ styles.footer } data-testid="footer">
      <Link to="/explorar/bebidas">
        <img
          className={ styles.icons }
          src={ drinkIcon }
          alt="Drinks"
          data-testid="drinks-bottom-btn"
        />
      </Link>
      <Link to="/explorar">
        <img
          className={ styles.icons }
          src={ exploreIcon }
          alt="Explorar"
          data-testid="explore-bottom-btn"
        />
      </Link>
      <Link to="/explorar/comidas">
        <img
          className={ styles.icons }
          src={ mealIcon }
          alt="Comidas"
          data-testid="food-bottom-btn"
        />
      </Link>
    </footer>
  );
}

export default Footer;
