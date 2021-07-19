import React from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import MenuFooter from '../../components/menuFooter';
import './profile.css';

export default function ProfileScreen() {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user')) || [];

  function cleanStorage() {
    localStorage.clear();
    history.push('/');
  }
  return (
    <>
      <Header title="Perfil" isSearch={ false } />
      <p className="profile-email" data-testid="profile-email">{Object.values(email)}</p>
      <div className="buttons-container">
        <Link to="/receitas-feitas">
          <button
            className="buttons"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="receitas-favoritas">
          <button
            className="buttons"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          className="buttons"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => cleanStorage() }
        >
          Sair
        </button>
      </div>
      <MenuFooter />
    </>
  );
}
