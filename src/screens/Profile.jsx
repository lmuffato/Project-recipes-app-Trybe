import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function Profile() {
  const { user } = localStorage;
  const FILTER_EMAIL_START = 10;
  const FILTER_EMAIL_END = -2;

  return (
    <main>
      <HeaderExplore />
      <h3 data-testid="profile-email">
        {(user) ? user.slice(FILTER_EMAIL_START, FILTER_EMAIL_END) : null}
      </h3>
      <Link to="receitas-feitas">
        <button type="button" data-testid="profile-done-btn">
          Receitas Feitas
        </button>
      </Link>
      <Link to="receitas-favoritas">
        <button type="button" data-testid="profile-favorite-btn">
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ (() => localStorage.clear()) }
        >
          Sair
        </button>
      </Link>
      <FooterBar />
    </main>
  );
}

export default Profile;
