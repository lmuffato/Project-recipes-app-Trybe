import React from 'react';
import '../styles/Header.css';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  return (
    <header className="header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="profile" />
      </Link>
      <h1 data-testid="page-title">Título</h1>
      <btn data-testid="profile-top-btn">
        <img src={ searchIcon } alt="magnifier" />
      </btn>
    </header>
  );
}

export default Header;
