import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
  const styleFooter = {
    bottom: '0px',
    position: 'fixed',
  };
  const history = useHistory();
  return (
    <footer className="footer" data-testid="footer" style={ styleFooter }>
      <button type="button" onClick={ () => history.push('/bebidas') }>
        <img src={ drinkIcon } alt="Drink Icon" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/explorar') }>
        <img src={ exploreIcon } alt="Explore Icon" data-testid="explore-bottom-btn" />
      </button>
      <button type="button" onClick={ () => history.push('/comidas') }>
        <img src={ mealIcon } alt="Food Icon" data-testid="food-bottom-btn" />
      </button>
    </footer>
  );
}
