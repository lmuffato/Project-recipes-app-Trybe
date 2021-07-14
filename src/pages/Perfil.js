import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Perfil() {
  let email;
  if (localStorage.user) {
    email = JSON.parse(localStorage.getItem('user')).email;
  }

  return (
    <div>
      <Header
        title="Perfil"
        enableSearchIcon={ false }
      />
      <p data-testid="profile-email">
        { email }
      </p>
      <Link to="/receitas-feitas">
        <button
          type="submit"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="submit"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="submit"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}
