import React from 'react';
import PropTypes from 'prop-types';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const { children } = props;
  const toHideSearchIcon = [
    'Explorar',
    'Explorar Comidas',
    'Explorar Ingradientes',
    'Receitas Feitas', 'Receitas Favoritas', 'Perfil',
  ];

  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        { profileIcon }
      </button>
      <h1 data-testid="page-title">{ children }</h1>
      {
        toHideSearchIcon.includes(children)
          ? ''
          : (
            <button
              type="button"
              data-testid="search-top-btn"
            >
              { searchIcon }
            </button>
          )
      }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Header;
