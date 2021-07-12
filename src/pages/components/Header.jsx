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
};

function Header(props) {
  const { type } = props;
  const [searchBar, toggleSearchBar] = useState(false);

  const showSearchIcon = () => {
    if (['meals', 'drinks', 'search-area'].includes(type)) return true;
    return false;
  };

  return (
    <Container as="header">
      <Row sm="3" xs="3">
        <Col>
          <Link to="/perfil">
            <img data-testid="profile-top-btn" src={ profileIcon } alt="Profile icon" />
          </Link>
        </Col>
        <Col>
          <h3 data-testid="page-title">{ pageTitle(type) }</h3>
        </Col>
        <Col>
          { showSearchIcon() ? (
            <button type="button" onClick={ () => toggleSearchBar(!searchBar) }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search icon"
              />
            </button>
          )
            : null }
        </Col>
      </Row>
      <Row>
        <Col>
          { searchBar ? <SearchBar type={ type } /> : null }
        </Col>
      </Row>
    </Container>
  );
}

Header.propTypes = {
  type: string,
}.isRequired;

export default Header;
