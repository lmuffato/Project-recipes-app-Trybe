import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import UserContext from '../context/UserContext';
import { getItemFromLocalStorage } from '../services/localStorage';

function Profile() {
  const { setEmail } = useContext(UserContext);

  const handleClick = () => {
    localStorage.clear();
    setEmail('');
  };

  return (
    <div>
      <Header title="Perfil" />
      <h3 data-testid="profile-email">{ getItemFromLocalStorage('user').email }</h3>
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
          onClick={ handleClick }
        >
          Sair
        </button>
      </Link>
      <Footer />
    </div>
  );
}

export default Profile;
