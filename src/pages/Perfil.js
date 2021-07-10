import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const getEmail = JSON.parse(localStorage.getItem('user'));

  const done = () => {
    window.location.href = '/receitas-feitas';
  };
  const favorite = () => {
    window.location.href = '/receitas-favoritas';
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">{getEmail ? getEmail.email : ''}</h2>
      <button type="button" data-testid="profile-done-btn" onClick={ () => done() }>
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => favorite() }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => logout() }
      >
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
