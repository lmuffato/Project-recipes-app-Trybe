import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Wrapper from '../styles/profile';
import Header from '../components/Header/Header';
import Button from '../components/Generics/Button';
import Footer from '../components/Footer/Footer';
import logoIcon from '../images/savory-6.svg';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleRedirecToLogin = (ev) => {
    ev.preventDefault();
    localStorage.clear(); // por ora, coloquei localStorage.clear, mas devemos avaliar se é mesmo a melhor opção
    history.push('/');
  };

  const handleRedirectToFavRecipes = (ev) => {
    ev.preventDefault();
    history.push('/receitas-favoritas');
  };

  const handleRedirectToDoneRecipes = (ev) => {
    ev.preventDefault();
    history.push('/receitas-feitas');
  };

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    const handleGetEmailFromLocalStorage = () => {
      const getEmail = JSON.parse(localStorage.getItem('user'));
      if (getEmail) {
        setEmail(getEmail.email);
      }
    };
    handleGetEmailFromLocalStorage();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <>
      <Header heading="Perfil" logoSrc={ logoIcon } />
      <Wrapper>
        <strong data-testid="profile-email">{ email }</strong>
        <Button data-testid="profile-done-btn" onClick={ handleRedirectToDoneRecipes }>
          Receitas Feitas
        </Button>
        <Button data-testid="profile-favorite-btn" onClick={ handleRedirectToFavRecipes }>
          Receitas Favoritas
        </Button>
        <Button data-testid="profile-logout-btn" onClick={ handleRedirecToLogin }>
          Sair
        </Button>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Profile;
