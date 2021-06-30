import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

export default function Header() {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <div className="header-searchbar-container">
      <div className="header-container">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Icone de perfil" />
        </Link>
        <span data-test-id="page-title">titulo</span>
        <button type="button" onClick={ () => setDisplaySearchBar(!displaySearchBar) }>
          <img data-testid="search-top-btn" src={ searchIcon } alt="Icone de perfil" />
        </button>
      </div>
      {displaySearchBar ? <SearchBar /> : null}
    </div>
  );
}
