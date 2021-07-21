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

  const user = getItemFromLocalStorage('user');

  return (
    <div>
      <Header title="Perfil" />
      <div className="cardsGroup">
        <div className="emailLogad">
          <div className="profile-email">
            {user ? (
              <span
                data-testid="profile-email"
              >
                { `Olá, ${user.email}` }
              </span>
            ) : (null)}
          </div>
          <div className="firstLetter">
            {user ? (
              <span>
                { `${user.email[0].toUpperCase()}` }
              </span>
            ) : (null)}
          </div>
        </div>

        <Link to="/receitas-feitas">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="itemCard exploreButtons"
          >
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="itemCard exploreButtons"
          >
            Receitas Favoritas
          </button>
        </Link>
        <Link to="/">
          <button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClick }
            className="itemCard exploreButtons"
          >
            Sair
          </button>
        </Link>
        <Footer />
      </div>
    </div>
  );
}

export default Profile;
