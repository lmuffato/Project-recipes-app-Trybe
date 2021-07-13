import React from 'react';
import ExploreIcon from '../../../images/exploreIcon.svg';
import styles from './styles.module.scss';

function Header() {
  return (
    <header id={ styles.header }>
      <div>
        <img src={ ExploreIcon } alt="Explore icon" data-testid="recipe-photo" />
        Chelsea Buns
      </div>
    </header>
  );
}

export default Header;
