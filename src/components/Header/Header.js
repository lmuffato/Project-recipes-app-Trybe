import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header({ title }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <div className="header-searchbar-container">
      <div className="header-container">
        <Link to="/perfil" data-testid="profile-top-btn" src="profileIcon">
          <img src={ profileIcon } alt="Icone de perfil" />
        </Link>
        <span data-testid="page-title">{title}</span>
        <button
          type="button"
          src={ searchIcon }
          alt="Search Icon"
          data-testid="search-top-btn"
          onClick={ () => setDisplaySearchBar(!displaySearchBar) }
        >
          <img src={ searchIcon } alt="Search Icon" />
        </button>
      </div>
      {displaySearchBar ? <SearchBar /> : null}
    </div>
  );
}
