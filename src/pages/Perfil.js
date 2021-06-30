import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../compenents/Header';
import UserContext from '../contexts/UserContext';
import '../styles/Perfil.css';

function Perfil() {
  const contextUser = useContext(UserContext);
  const { userEmail } = contextUser;
  return (
    <>
      <Header />
      <div className="profile-btns">
        <p data-testid="profile-email">{userEmail}</p>
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
        <button type="button" data-testid="profile-logout-btn">Sair</button>
      </div>
    </>
  );
}

export default Perfil;
