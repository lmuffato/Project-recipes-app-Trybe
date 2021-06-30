import React from 'react';
import { string, bool } from 'prop-types';

import profileSvg from '../images/profileIcon.svg';
import searchSvg from '../images/searchIcon.svg';

export default function Header({ title, searchIcon = false }) {
  return (
    <header>
      <button type="button">
        <img
          data-testid="profile-top-btn"
          src={ profileSvg }
          alt="Profile Avatar"
        />
      </button>

      <h1 data-testid="page-title">{title}</h1>

      {searchIcon && (
        <button type="button">
          <img src={ searchSvg } alt="Search" data-testid="search-top-btn" />
        </button>
      )}
    </header>
  );
}

Header.propTypes = {
  title: string,
  searchIcon: bool,
}.isRequired;
