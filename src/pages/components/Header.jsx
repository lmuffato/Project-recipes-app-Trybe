import React from 'react';
import { string } from 'prop-types';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function RecipesHeader(props) {
  const { type } = props;

  const pageTitle = () => {
    if (type === 'meals') return 'Comidas';
    if (type === 'drinks') return 'Bebidas';
    if (type === 'search') return 'Explorar';
    if (type === 'search-ingredients') return 'Explorar Ingredientes';
    if (type === 'search-origin') return 'Explorar Origem';
  };

  const showSearchIcon = () => {
    if (['meals', 'drinks', 'search-origin'].includes(type)) return true;
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
          <h3 data-testid="page-title">{ pageTitle() }</h3>
        </Col>
        <Col>
          { showSearchIcon() ? (
            <Link to="/explorar">
              <img data-testid="search-top-btn" src={ searchIcon } alt="Search icon" />
            </Link>)
            : null }
        </Col>
      </Row>
    </Container>
  );
}

RecipesHeader.propTypes = {
  type: string,
}.isRequired;

export default RecipesHeader;
