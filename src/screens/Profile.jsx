import React from 'react';
import { Link } from 'react-router-dom';
import FooterBar from '../components/FooterBar';
import HeaderExplore from '../components/HeaderExplore';

function Profile() {
  return (
    <main>
      <HeaderExplore />
      <Link to="receitas-feitas">Receitas Feitas</Link>
      <Link to="receitas-favoritas">Receitas Favoritas</Link>
      <h3>Sair</h3>
      <FooterBar />
    </main>
  );
}

export default Profile;
