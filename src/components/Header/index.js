import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from '../SearchBar';
import './style.css';

export default function Header({ title }) {
  const [path, setPath] = useState('');
  const [searchActive, setSearchActive] = useState(false);
  const { pathname } = window.location;
  const handleCLick = () => {
    if (pathname === '/comidas') setPath('meal');
    if (pathname === '/bebidas') setPath('cocktail');
    setSearchActive(!searchActive);
  };

  const checkPath = () => {
    if (pathname.includes('area')) {
      return false;
    }
    if (
      pathname.includes('explorar')
      || pathname.includes('perfil')
      || pathname.includes('receitas')
    ) {
      return true;
    }
    return false;
  };

  const renderSearchButton = () => {
    if (!checkPath()) {
      return (
        <Button onClick={ handleCLick }>
          <img src={ searchIcon } alt="" data-testid="search-top-btn" />
        </Button>
      );
    }
  };

  const renderSearchBar = () => {
    if (searchActive) {
      return <SearchBar searchActive={ searchActive } place={ path } />;
    }
  };

  return (
    <header className="header-container" data-testid="header">
      <Link to="/perfil">
        <img src={ profileIcon } alt="" data-testid="profile-top-btn" />
      </Link>
      <h1 data-testid="page-title">{title}</h1>
      {renderSearchButton()}
      {renderSearchBar()}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
