import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Perfil.css';

function Perfil() {
  const emailFinder = () => {
    let info = {};
    const localSize = localStorage.length;
    if (localSize !== 0) {
      info = JSON.parse(localStorage.getItem('user')).email;
      return (<p data-testid="profile-email">{ info }</p>);
    }
  };

  return (
    <div className="profile-page">
      <Header title="Perfil" displayButton={ false } />
      <div className="email-profile-page">
        { emailFinder() }
      </div>
      <div className="btn-profile-page">
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">Receitas Feitas</button>
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
            onClick={ () => localStorage.clear() }
          >
            Sair
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
