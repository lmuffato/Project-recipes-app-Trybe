import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProfilePage.css';

function Profile() {
  const userEmailStorage = JSON.parse(localStorage.getItem('user'));
  const userEmail = userEmailStorage.email;

  const clearStorage = () => localStorage.clear();

  return (
    <div className="profile-elements">
      <p data-testid="profile-email">{userEmail}</p>
      <Link to="/receitas-feitas">
        <button
          type="button"
          data-testid="profile-done-btn"
          className="profile-btns"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          type="button"
          data-testid="profile-favorite-btn"
          className="profile-btns"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          type="button"
          data-testid="profile-logout-btn"
          className="profile-btns"
          onClick={ clearStorage }
        >
          Sair
        </button>
      </Link>
    </div>
  );
}

export default Profile;
