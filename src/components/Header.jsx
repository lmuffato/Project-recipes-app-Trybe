import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import '../pages/Comidas/style.css';

export default () => {
  const [searchActive, setSearchActive] = useState(false);
  const handleCLick = () => {
    setSearchActive(!searchActive);
  };

  const style = { visibility: `${searchActive ? 'visible' : 'hidden'}` };

  console.log(searchActive);

  return (
    <header className="header-container" data-testid="header">
      <Link to="/perfil" data-testid="profile-top-btn">
        <img src={ profileIcon } alt="" />
      </Link>
      <h1 data-testid="page-title">Comidas</h1>
      <Button data-testid="search-top-btn" onClick={ handleCLick }>
        <img src={ searchIcon } alt="" />
      </Button>
      <SearchBar style={ style } searchActive={ searchActive } />
    </header>
  );
};
