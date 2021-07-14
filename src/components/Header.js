import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Search from './Search';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import styles from '../styles/Header.module.scss';

export default function Header(props) {
  const { title, showButton, showHeader, path } = props;
  const searchApi = String(path).includes('comidas') ? 'themealdb' : 'thecocktaildb';
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  if (showHeader) return '';
  return (
    <div className={ styles.container }>
      <header>
        <Link
          className={ styles.profile }
          to="/perfil"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile"
        >
          <img src={ profileIcon } alt="Search" />
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
              className={ styles.search }
            >
              <img src={ searchIcon } alt="Search" />
            </button>)
        }
      </header>
      { showSearch && <Search searchApi={ searchApi } { ...{ path } } />}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  showButton: PropTypes.bool,
  showHeader: PropTypes.bool,
  path: PropTypes.string,
};

Header.defaultProps = {
  showButton: undefined,
  showHeader: undefined,
  path: undefined,
};
