import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import './styles.css';

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
    <section>
      <Header>Perfil</Header>
      <div className="container">
        <h5 data-testid="profile-email">{email}</h5>
        <Link to="/receitas-feitas">
          <Button
            className="mybutton btn-lg btn-warning"
            type="button"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button
            className="mybutton btn-lg btn-warning"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Button>
        </Link>
        <Link to="/">
          <Button
            className="mybutton btn-lg"
            type="button"
            data-testid="profile-logout-btn"
            size="sm"
            onClick={ handleLogout }
          >
            Sair
          </Button>
        </Link>
      </div>
      <Footer />
    </section>
  );
};

export default Profile;
