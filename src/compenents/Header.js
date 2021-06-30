import React, { useState } from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
// import RecipesAppContext from '../contexts/RecipesAppContext';

function Header() {
  const [searchBtn, setSearchBtn] = useState(false);

  function getSearchBar() {
    return searchBtn ? setSearchBtn(false) : setSearchBtn(true);
  }

  function searchInput() {
    return (
      <div>
        <label htmlFor="searchBar">
          <input
            id="searchBar"
            type="text"
            data-testid="search-input"
          />
        </label>
      </div>
    );
  }

  return (
    <header className="header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profile" />
      </Link>
      <h1 data-testid="page-title">Título</h1>
      <button
        type="button"
        data-testid="search-top-btn"
        onClick={ getSearchBar }
        className="searchBtn"
      >
        <img src={ searchIcon } alt="magnifier" />
      </button>
      { searchBtn && searchInput() }
    </header>
  );
}

export default Header;
