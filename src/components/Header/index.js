import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './style.css';

export default function Header() {
  const [searchActive, setSearchActive] = useState(false);
  let path;
  const handleCLick = () => {
    const { pathname } = window.location;
    if (pathname === '/comidas') path = 'meal';
    if (pathname === '/bebidas') path = 'cocktail';
    setSearchActive(!searchActive);
  };

  return (
    <header className="header-container" data-testid="header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="" />
      </Link>
      <h1 data-testid="page-title">Comidas</h1>
      <Button data-testid="search-top-btn" onClick={ handleCLick }>
        <img src={ searchIcon } alt="" />
      </Button>
      <SearchBar searchActive={ searchActive } path={ path } />
    </header>
  );
}
