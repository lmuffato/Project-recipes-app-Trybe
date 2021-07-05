import React from 'react';
import { Link } from 'react-router-dom';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import { FoodContext } from '../Context/FoodProvider';

const Footer = () => {
  const { setCategory } = React.useContext(FoodContext);

  const handleClick = () => {
    setCategory(false);
  };

  return (
    <footer data-testid="footer">
      <Link to="/bebidas">
        <button type="button" onClick={ handleClick }>
          <img src={ drinkIcon } alt="Drink icon" data-testid="drinks-bottom-btn" />
        </button>
      </Link>
      <Link to="/explorar">
        <button type="button" onClick={ handleClick }>
          <img src={ exploreIcon } alt="Explore icon" data-testid="explore-bottom-btn" />
        </button>
      </Link>
      <Link to="/comidas">
        <button type="button" onClick={ handleClick }>
          <img src={ mealIcon } alt="Food icon" data-testid="food-bottom-btn" />
        </button>
      </Link>
    </footer>);
};

export default Footer;
