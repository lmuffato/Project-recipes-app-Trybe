import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, searchImg }) {
  return (
    <div>
      <Link to="/perfil">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="imagem perfil" />
      </Link>
      <h2 data-testid="page-title">{title}</h2>
      {searchImg ? (
        <button
          type="button"
          data-testid="search-top-btn"
        >
          <img src={ searchIcon } alt="botão buscar" />
        </button>
      ) : null}
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string,
  searchImg: PropTypes.bool,
}.isRequired;

export default Header;
