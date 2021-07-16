import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../../style/Header.css';

export default function Header({ title, enableSearchIcon = true }) {
  const [displaySearchBar, setDisplaySearchBar] = useState(false);

  return (
    <div className="header-searchbar-container">
      <div className="header-container control">
        <Link to="/perfil" data-testid="profile-top-btn" src="profileIcon">
          <img src={ profileIcon } alt="Icone de perfil" className="profile-image" />
        </Link>
        <span data-testid="page-title">{title}</span>
        { enableSearchIcon && (
          <button
            className="header-search-button"
            type="button"
            src={ searchIcon }
            data-testid="search-top-btn"
            onClick={ () => setDisplaySearchBar(!displaySearchBar) }
          >
            <img src={ searchIcon } alt="Search Icon" />
          </button>
        ) }
      </div>
      {displaySearchBar ? <SearchBar /> : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  enableSearchIcon: PropTypes.bool,
}.isRequired;
