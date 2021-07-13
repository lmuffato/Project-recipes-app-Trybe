import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';
import '../styles/ProfilePage.css';

function Profile() {
  const userEmailStorage = JSON.parse(localStorage.getItem('user'));
  const userEmail = userEmailStorage.email;
  const { setHideSearchBtn } = useContext(SearchbarContext);

  const clearStorage = () => localStorage.clear();

  useEffect(() => {
    setHideSearchBtn(false);
  }, []);

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default Profile;
