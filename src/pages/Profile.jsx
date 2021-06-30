import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Button from '../components/Generics/Button';

function Profile() {
  const history = useHistory();

  const handleRedirecToLogin = (ev) => {
    ev.preventDefault();
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Perfil</h2>
      </Header>
      <section className="container">
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
      </section>
    </div>
  );
}

export default Profile;
