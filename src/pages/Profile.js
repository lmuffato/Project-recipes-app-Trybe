import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import '../styles/Profile.css';

function Profile() {
  const contextUser = useContext(UserContext);
  const { userEmail } = contextUser;

  const clearStorage = () => localStorage.clear();

  return (

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
  );
}

export default Profile;
