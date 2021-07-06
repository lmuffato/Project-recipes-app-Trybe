import React from 'react';
import ExploreIcon from '../../../images/exploreIcon.svg';
import './styles.css';

function Header() {
  return (
    <header id="header">
      <div>
        <img src={ ExploreIcon } alt="Explore icon" data-testid="recipe-photo" />
        Chelsea Buns
      </div>
    </header>
  );
}

export default Header;
