import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import './Profile.css';

const Profile = () => {
  const history = useHistory();
  const email = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).email
    : '';

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="container">
      <Header>Perfil</Header>
      <h5 data-testid="profile-email">{email}</h5>
      <Link to="/receitas-feitas">
        <button
          className="myButton"
          type="button"
          data-testid="profile-done-btn"
        >
          Receitas Feitas
        </button>
      </Link>
      <Link to="/receitas-favoritas">
        <button
          className="myButton"
          type="button"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </button>
      </Link>
      <Link to="/">
        <button
          className="myButton"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
};

export default Profile;
