import React from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function ProfileBody() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <Row data-testid="profile-email" className="profile-email">
        { user ? user.email : 'Email do usuário' }
      </Row>
      <Row>
        <Link to="/receitas-feitas" className="profile-links">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profile-btns"
          >
            Receitas Feitas
          </button>
        </Link>
      </Row>
      <Row>
        <Link to="/receitas-favoritas" className="profile-links">
          <button
            className="profile-btns"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
      </Row>
      <Row>
        <Link to="/" className="profile-links">
          <button
            type="button"
            className="profile-btns"
            data-testid="profile-logout-btn"
            onClick={ () => {
              localStorage.removeItem('user');
              localStorage.removeItem('mealsToken');
              localStorage.removeItem('cocktailsToken');
              localStorage.removeItem('favoriteRecipes');
              localStorage.removeItem('doneRecipes');
              localStorage.removeItem('inProgressRecipes');
            } }
          >
            Sair
          </button>
        </Link>
      </Row>
    </Container>
  );
}

export default ProfileBody;
