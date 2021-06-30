import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import './Header.css';

function Header({ props: { search, title } }) {
  return (
    <header>
      <img src={ profileIcon } data-testid="profile-top-btn" alt="profile icon" />
      <h1
        data-testid="page-title"
      >
        {title}
      </h1>
      {
        search && <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search icon"
        />
      }
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
}.isRequired;

export default Header;
