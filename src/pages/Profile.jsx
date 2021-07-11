import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  function Logout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div>
      <Header title="Perfil" />
      <h1 data-testid="profile-email">{ user && user.email }</h1>
      <button
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        onClick={ Logout }
        data-testid="profile-logout-btn"
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}
