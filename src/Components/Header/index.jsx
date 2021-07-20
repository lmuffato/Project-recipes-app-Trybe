import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar';
import './styles.css';

import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchCategories from '../SearchCategories';

function Header(props) {
  const { children } = props;
  const [serching, setSerching] = useState(false);

  const toHideSearchIcon = [
    'Explorar',
    'Explorar Comidas',
    'Explorar Bebidas',
    'Explorar Ingredientes',
    'Receitas Feitas', 'Receitas Favoritas', 'Perfil',
  ];

  const toHideCategories = [
    'Explorar',
    'Explorar Comidas',
    'Explorar Bebidas',
    'Explorar Ingredientes',
    'Explorar Origem',
    'Receitas Feitas', 'Receitas Favoritas', 'Perfil',
  ];

  return (
    <div className="header-parent">
      <div className="main-header">
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
      </div>
      {
        serching
          ? <SearchBar page={ children.includes('Comida') ? 'meals' : 'drinks' } />
          : null
      }
      {
        !toHideCategories.includes(children) && !serching
          ? <SearchCategories page={ children.includes('Comida') ? 'meals' : 'drinks' } />
          : null
      }
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Header;
