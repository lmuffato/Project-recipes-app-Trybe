import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">E-mail</h2>
      <button type="button" data-testid="profile-done-btn">
        Receitas Feitas
      </button>
      <button type="button" data-testid="profile-favorite-btn">
        Receitas Favoritas
      </button>
      <button type="button" data-testid="profile-logout-btn">
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
