import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function Profile() {
  return (
    <main>
      <HeaderExplore />
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
        <button type="button" data-testid="profile-logout-btn">
          Sair
        </button>
      </Link>
      <FooterBar />
    </main>
  );
}

export default Profile;
