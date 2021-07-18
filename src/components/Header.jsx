import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchImg = false }) {
  const [searchInput, setSearchInput] = useState(false);

  return (
    <header>
      <div className="headerTop">
        <Link to="/perfil">
          <img data-testid="profile-top-btn" src={ profileIcon } alt="imagem perfil" />
        </Link>
        <h2 data-testid="page-title">{title}</h2>
        {searchImg ? (
          <button
            type="button"
            onClick={ () => setSearchInput(!searchInput) }
            className="searchButton"
          >
            <img data-testid="search-top-btn" src={ searchIcon } alt="botão buscar" />
          </button>
        ) : null}
      </div>
      {searchInput ? (<SearchBar />) : null}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchImg: PropTypes.bool,
}.isRequired;

export default Header;
