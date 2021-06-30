import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const { children } = props;
  const [serching, setSerching] = useState(false);

  const toHideSearchIcon = [
    'Explorar',
    'Explorar Comidas',
    'Explorar Ingradientes',
    'Receitas Feitas', 'Receitas Favoritas', 'Perfil',
  ];

  return (
    <div>
      <Link to="/perfil">
        <button
          type="button"
          data-testid="profile-top-btn"
        >
          {profileIcon}
        </button>
      </Link>
      <h1 data-testid="page-title">{children}</h1>
      {
        toHideSearchIcon.includes(children)
          ? ''
          : (
            <button
              type="button"
              data-testid="search-top-btn"
              onClick={ () => setSerching((oldState) => !oldState) }
            >
              {searchIcon}
            </button>
          )
      }
      {
        serching ? <SearchBar /> : ''
      }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Header;
