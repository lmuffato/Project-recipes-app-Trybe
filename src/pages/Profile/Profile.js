import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import { getEmail } from '../../services/localStorage';
import './Profile.css';

export default function Profile() {
  const { email } = getEmail('user');
  const history = useHistory();

  function clearRedirect() {
    window.localStorage.clear();
    history.push('/');
  }
  return (
    <div>
      <Header title="Perfil" show={ false } />
      <div className="infoContainer">
        <p className="titleEmail" data-testid="profile-email">{ email }</p>
        <div className="recipesContainer">
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
        </div>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => clearRedirect() }
        >
          Sair
        </button>
      </div>
      <BottomMenu />
    </div>
  );
}
