import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';

import './style.css';

const Profile = () => {
  const userEmail = JSON.parse(localStorage.getItem('user')) || '';

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <div className="container">
        <span
          className="span-email"
          data-testid="profile-email"
        >
          { userEmail.email }
        </span>
        <div className="buttons">
          <button type="button" className="button" data-testid="profile-done-btn">
            <Link to="/receitas-feitas">
              Receitas Feitas
            </Link>
          </button>
          <button type="button" className="button" data-testid="profile-favorite-btn">
            <Link to="/receitas-favoritas">
              Receitas Favoritas
            </Link>
          </button>
          <button
            type="button"
            className="button"
            data-testid="profile-logout-btn"
            onClick={ logout }
          >
            <Link to="/">
              Sair
            </Link>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
