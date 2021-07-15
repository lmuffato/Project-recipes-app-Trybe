import React from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

function Perfil() {
  const userEmailStorage = JSON.parse(localStorage.getItem('user')) || { email: '' };
  const userEmail = userEmailStorage.email;

  const clearStorage = () => localStorage.clear();

  return (
    <section>
      <Header title="Perfil" show={ false } />

      <div className="perfil">
        <span data-testid="profile-email">{userEmail}</span>
        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ clearStorage }
          >
            Sair
          </button>
        </Link>
      </div>

      <Footer />
    </section>
  );
}

export default Perfil;
