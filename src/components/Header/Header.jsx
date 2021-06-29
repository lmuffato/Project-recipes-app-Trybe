import React from 'react';
import PropTypes from 'prop-types';
import profileIconImg from '../../images/profileIcon.svg';
import searchIconImg from '../../images/searchIcon.svg';
// 1 botão de perfil -- que redireciona pra tela de perfil

function Header({ children }) {
  return (
    <header>
      <button type="button" data-testid="profile-top-btn">
        <img src={ profileIconImg } alt="Logo da página de perfil" />
      </button>
      { children }
      <button type="button" data-testid="search-top-btn">
        <img src={ searchIconImg } alt="Logo da página de perfil" />
      </button>
    </header>
  );
}

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
