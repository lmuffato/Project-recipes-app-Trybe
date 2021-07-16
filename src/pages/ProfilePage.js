import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';
import UserContext from '../contexts/UserContext';
import '../styles/ProfilePage.css';

function Profile() {
  const [userEmailProfile, setUserEmailProfile] = useState('');
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);
  const { userEmail } = useContext(UserContext);

  useEffect(() => {
    const userEmailStorageString = JSON.parse(localStorage.getItem('user'));
    if (userEmailStorageString === null) setUserEmailProfile(userEmail);
    else setUserEmailProfile(userEmailStorageString.email);
    setHideSearchBtn(false);
    setPageName('Perfil');
  }, []);

  const clearStorage = () => localStorage.clear();

  return (
    <>
      <Header />
      <div className="profile-elements">
        <p data-testid="profile-email">{userEmailProfile}</p>
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
