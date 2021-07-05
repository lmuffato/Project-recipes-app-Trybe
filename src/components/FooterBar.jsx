import React from 'react';
import { Link } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function FooterBar() {
  return (
    <footer data-testid="footer">
      <Link to="/main/drink" data-testid="drinks-bottom-btn">
        <img src={ drinkIcon } alt="icon of drink page" />
      </Link>
      <Link to="/explore" data-testid="explore-bottom-btn">
        <img src={ exploreIcon } alt="icon of drink page" />
      </Link>
      <Link to="/main/food" data-testid="food-bottom-btn">
        <img src={ mealIcon } alt="icon of drink page" />
      </Link>
    </footer>
  );
}

export default FooterBar;
