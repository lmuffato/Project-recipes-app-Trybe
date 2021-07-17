import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, Footer } from '../../components';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    try {
      setUserEmail(getEmail.email);
    } catch (error) {
      setUserEmail('email');
    }
  }, []);

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Perfil" searchBtn={ false } />
      <p data-testid="profile-email">{ userEmail }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/receitas-feitas') }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/receitas-favoritas') }
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
