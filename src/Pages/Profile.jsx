import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const [redirectDone, setRedirectDone] = useState(false);
  const [redirectFavorites, setRedirectFavorites] = useState(false);
  const [redirectLogin, setRedirectLogin] = useState(false);

  useEffect(() => {
    const getEmail = localStorage.getItem('user');
    setUserEmail(JSON.parse(getEmail).email);
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    setRedirectLogin(true);
  };

  if (redirectDone) return <Redirect to="/receitas-feitas" />;
  if (redirectFavorites) return <Redirect to="/receitas-favoritas" />;
  if (redirectLogin) return <Redirect to="/" />;

  return (
    <>
      <Header title="Perfil" searchBtn={ false } />
      <p data-testid="profile-email">{ userEmail }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => setRedirectDone(true) }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => setRedirectFavorites(true) }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clearLocalStorage }
      >
        Sair
      </button>
      <Footer />
    </>
  );
}

export default Profile;
