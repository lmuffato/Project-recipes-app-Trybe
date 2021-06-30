import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Wrapper from '../styles/profile';
import Header from '../components/Header/Header';
import Button from '../components/Generics/Button';

function Profile() {
  const history = useHistory();

  const handleRedirecToLogin = (ev) => {
    ev.preventDefault();
    localStorage.clear(); // por ora, coloquei localStorage.clear, mas devemos avaliar se é mesmo a melhor opção
    history.push('/');
  };

  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Perfil</h2>
      </Header>
      <Wrapper>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button type="button" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </button>
        </Link>
        <Button data-testid="profile-logout-btn" onClick={ handleRedirecToLogin }>
          Sair
        </Button>
      </Wrapper>
    </div>
  );
}

export default Profile;
