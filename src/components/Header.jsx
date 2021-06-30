import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

export default () => (
  <header className="header-container" data-testid="header">
    <Link to="/profile" data-testid="profile-top-btn">
      <img src={ profileIcon } alt="" />
    </Link>
    <h1 data-testid="page-title">Comidas</h1>
    <Button data-testid="search-top-btn">
      <img src={ searchIcon } alt="" />
    </Button>
  </header>
);
