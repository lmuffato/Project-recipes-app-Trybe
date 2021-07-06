import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SearchbarContext from '../contexts/SearchbarContext';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const {
    setMealOrDrink, setSearchCategory,
  } = useContext(SearchbarContext);

  const handleClick = (search) => {
    setMealOrDrink(search);
    setSearchCategory('list');
  };

  return (
    <footer data-testid="footer">
      <Link to="/bebidas" onClick={ () => handleClick('cocktail') }>
        <img src={ drinkIcon } alt="drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/explorar">
        <img src={ exploreIcon } alt="explore" data-testid="explore-bottom-btn" />
      </Link>
      <Link to="/comidas" onClick={ () => handleClick('meal') }>
        <img src={ mealIcon } alt="food" data-testid="food-bottom-btn" />
      </Link>
    </footer>
  );
}

export default Footer;
