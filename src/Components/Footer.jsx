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
        <input
          type="image"
          data-testid="drinks-bottom-btn"
          onClick={ handleClick }
          src={ drinkIcon }
          alt="Drink icon"
        />
      </Link>
      <Link to="/explorar">
        <input
          type="image"
          data-testid="explore-bottom-btn"
          onClick={ handleClick }
          src={ exploreIcon }
          alt="Explore icon"
        />
      </Link>
      <Link to="/comidas">
        <input
          type="image"
          data-testid="food-bottom-btn"
          onClick={ handleClick }
          src={ mealIcon }
          alt="Food icon"
        />
      </Link>
    </footer>);
};

export default Footer;
