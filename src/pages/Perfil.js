import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Perfil.css';

export default function Perfil() {
  let email;
  let counter = 0;

  if (localStorage.user) {
    email = JSON.parse(localStorage.getItem('user')).email;
  }

  function switchTheme() {
    if (counter % 2 === 0) {
      document.body.style.backgroundColor = 'rgb(30, 30, 30)';
      document.body.style.color = 'white';

      counter += 1;
    } else {
      document.body.style.backgroundColor = 'whitesmoke';
      document.body.style.color = 'rgb(30, 30, 30)';
      counter += 1;
    }
  }

  return (
    <div className="profile-main">
      <Header
        title="Profile"
        enableSearchIcon={ false }
      />
      <h2 data-testid="profile-email" className="profile-head-email">
        { email }
      </h2>
      <button
        type="button"
        className="button"
        onClick={ switchTheme }
      >
        Switch Theme
      </button>
      <br />
      <Link to="/receitas-feitas">
        <button
          className="button is-primary"
          type="submit"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <br />
      <Link to="/receitas-favoritas">
        <button
          className="button is-primary"
          type="submit"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <br />
      <Link to="/">
        <button
          className="button is-danger"
          type="submit"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}
