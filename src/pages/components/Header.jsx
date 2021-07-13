import React, { useState } from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';

const pageTitle = (type) => {
  if (type === 'meals') return 'Comidas';
  if (type === 'drinks') return 'Bebidas';
  if (type === 'search') return 'Explorar';
  if (type === 'search-drinks') return 'Explorar Bebidas';
  if (type === 'search-meals') return 'Explorar Comidas';
  if (type === 'search-ingredients') return 'Explorar Ingredientes';
  if (type === 'search-area') return 'Explorar Origem';
  if (type === 'profile') return 'Perfil';
  if (type === 'favorites') return 'Receitas Favoritas';
  if (type === 'done-recipes') return 'Receitas Feitas';
};

function Header(props) {
  const { type } = props;
  const [searchBar, toggleSearchBar] = useState(false);

  const showSearchIcon = () => {
    if (['meals', 'drinks', 'search-area'].includes(type)) return true;
    return false;
  };

  return (
    <div as="header" className="header-class">
      <Link to="/perfil">
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="Profile icon"
          className="headerIcon"
        />
      </Link>
      <h3 data-testid="page-title" className="page-title">{ pageTitle(type) }</h3>
      { showSearchIcon() ? (
        <button type="button" className="headerIcon" onClick={ () => toggleSearchBar(!searchBar) }>
          <img
            className="headerIcon"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="Search icon"
          />
        </button>
      )
        : null }
      { searchBar ? <SearchBar type={ type } /> : null }
    </div>
  );
}

Header.propTypes = {
  type: string,
}.isRequired;

export default Header;
