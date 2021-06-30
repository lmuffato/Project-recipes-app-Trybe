import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileSvg from '../images/profileIcon.svg';
import searchSvg from '../images/searchIcon.svg';

export default function Header({ title, searchIcon = false }) {
  const [showSearch, setShowSearch] = useState(false);
  const history = useHistory();

  return (
    <header>
      <button type="button" onClick={ () => history.push('/perfil') }>
        <img
          data-testid="profile-top-btn"
          src={ profileSvg }
          alt="Profile Avatar"
        />
      </button>

      <h1 data-testid="page-title">{title}</h1>

      {searchIcon && (
        <button type="button" onClick={ () => setShowSearch(!showSearch) }>
          <img src={ searchSvg } alt="Search" data-testid="search-top-btn" />
        </button>
      )}

      <div>
        {showSearch && (
          <input data-testid="search-input" placeholder="Buscar Receita" />
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: string,
  searchIcon: bool,
}.isRequired;
