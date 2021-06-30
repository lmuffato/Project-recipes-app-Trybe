import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './styles.css';

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
    <div className="header-parent">
      <Link to="/perfil">
        <img
          src={ profileIcon }
          data-testid="profile-top-btn"
          alt="user"
        />
      </Link>
      <h2 data-testid="page-title">{children}</h2>
      {
        toHideSearchIcon.includes(children)
          ? ''
          : (
            <img
              src={ searchIcon }
              aria-hidden="true"
              data-testid="search-top-btn"
              onClick={ () => setSerching((oldState) => !oldState) }
              alt="do search"
            />
          )
      }
      {
        serching ? (
          <SearchBar page={ children.includes('Comida') ? 'meals' : 'drinks' } />) : ''
      }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Header;
