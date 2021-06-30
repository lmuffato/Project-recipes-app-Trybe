import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ props: { search, title } }) {
  const [searchBar, setSearchBar] = useState(false);

  const showSearchBar = () => {
    if (searchBar) setSearchBar(false);
    else setSearchBar(true);
  };

  const showSearchButton = () => {
    if (search) {
      return (
        <button type="button" onClick={ showSearchBar }>
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="search icon"
          />
        </button>
      );
    }
  };

  const renderSearchBar = () => {
    if (searchBar) {
      return (
        <form>
          <input
            type="text"
            placeholder="Buscar Receita"
            data-testid="search-input"
          />
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="searchRadio"
              data-testid="ingredient-search-radio"
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchRadio"
              data-testid="name-search-radio"
            />
            Nome
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              id="firstLetter"
              name="searchRadio"
              data-testid="first-letter-search-radio"
            />
            Primeira Letra
          </label>
          <button
            type="button"
            data-testid="exec-search-btn"
          >
            Buscar
          </button>
        </form>
      );
    }
  };

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img src={ profileIcon } data-testid="profile-top-btn" alt="profile icon" />
        </Link>
        <h1
          data-testid="page-title"
        >
          {title}
        </h1>
        { showSearchButton() }
      </header>
      { renderSearchBar() }
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
}.isRequired;

export default Header;
