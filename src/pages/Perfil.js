import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Perfil() {
  const getEmail = JSON.parse(localStorage.getItem('user')).email;

  return (
    <div>
      <Header title="Perfil" />
      <h2 data-testid="profile-email">{getEmail}</h2>
      <button type="button">
        <Link to="/receitas-feitas" data-testid="profile-done-btn">
          Receitas Feitas
        </Link>
      </button>
      <button type="button">
        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </Link>
      </button>
      <button type="button" data-testid="profile-logout-btn">
        Sair
      </button>
      <Footer />
    </div>
  );
}

export default Perfil;
