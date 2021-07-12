import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Header.css';

import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ searchBar, type }) {
  const [showSearchBar, toggleShowSearchBar] = useState(false);
  useEffect(() => {
    if (!searchBar) {
      const btnSearch = document.getElementById('search-btn');
      btnSearch.style.opacity = 0;
      btnSearch.disable = true;
    }
  }, [searchBar]);

  const toggleSearchBar = () => {
    if (showSearchBar) {
      toggleShowSearchBar(false);
    } else {
      toggleShowSearchBar(true);
    }
  };

  return (
    <>
      <header className="m-Header">
        <Link
          to="/perfil"
        >
          <button type="button" data-testid="profile-top-btn">
            <img src={ profileIcon } alt="icone do perfil" />
          </button>
        </Link>
        <h1 data-testid="page-title">{document.title}</h1>
        <button
          type="button"
          data-testid="search-top-btn"
          id="search-btn"
          onClick={ searchBar ? toggleSearchBar : '' }
        >
          <img src={ searchIcon } alt="icone de pesquisa" />
        </button>
      </header>
      { showSearchBar && <SearchBar type={ type } /> }
    </>
  );
}

export default Header;

Header.propTypes = {
  título: PropTypes.string,
  icone1: PropTypes.string,
  icone2: PropTypes.string,
}.isRequired;
