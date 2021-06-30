import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ searchBar }) {
  useEffect(() => {
    if (!searchBar) {
      const btnSearch = document.getElementById('search-btn');
      btnSearch.disabled = true;
      btnSearch.style.opacity = 0;
    }
  }, [searchBar]);

  return (
    <header className="m-Header">
      <Link
        to="/perfil"
      >
        <button type="button" data-testid="profile-top-btn">
          <img src={ profileIcon } alt="" />
        </button>
      </Link>
      <h1 data-testid="page-title">{document.title}</h1>
      <button type="button" data-testid="search-top-btn" id="search-btn">
        <img src={ searchIcon } alt="" />
      </button>

    </header>

  );
}

export default Header;

Header.propTypes = {
  título: PropTypes.string,
  icone1: PropTypes.string,
  icone2: PropTypes.string,
}.isRequired;
