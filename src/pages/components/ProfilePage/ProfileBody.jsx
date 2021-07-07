import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function ProfileBody() {
  const { email } = JSON.parse(localStorage.getItem('user'));

  return (
    <Container>
      <Row data-testid="profile-email">
        { email }
      </Row>
      <Row>
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Row>
      <Row>
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Row>
      <Row>
        <button
          type="button"
          data-testid="profile-logout-btn"
        >
          Sair
        </button>
      </Row>
    </Container>
  );
}

export default ProfileBody;
