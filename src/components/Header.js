import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default function Header(props) {
  const { title, showButton, showHeader, path } = props;
  // const { path } = params;
  const searchApi = String(path).includes('comidas') ? 'themealdb' : 'thecocktaildb';
  // const bebida = 'thecocktaildb';
  //   const comida = 'themealdb';
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  if (showHeader) return '';
  return (
    <div className="Header">
      <header className="header">
        <Link
          className="header-img"
          to="/perfil"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        >
          <img src={ profileIcon } alt="Search" className="header-img" />
        </Link>
        <h1 data-testid="page-title">
          {title}
        </h1>
        {
          showButton && (
            <button
              type="button"
              onClick={ toggleSearch }
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Search"
            >
              <img src={ searchIcon } alt="Search" className="header-img" />
            </button>)
        }
      </header>
      { showSearch && <Search searchApi={ searchApi } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showButton: PropTypes.bool.isRequired,
  showHeader: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};
