import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Wrapper from '../styles/profile';
import Header from '../components/Header/Header';
import Button from '../components/Generics/Button';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const handleRedirecToLogin = (ev) => {
    ev.preventDefault();
    localStorage.clear(); // por ora, coloquei localStorage.clear, mas devemos avaliar se é mesmo a melhor opção
    history.push('/');
  };

  const handleGetEmailFromLocalStorage = () => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    if (getEmail) {
      setEmail(getEmail.email);
    }
  };

  useEffect(() => {
    handleGetEmailFromLocalStorage();
  }, []);

  return (
    <div>
      <Header>
        <h2 data-testid="page-title">Perfil</h2>
      </Header>
      <Wrapper>
        <strong data-testid="profile-email">{ email || 'email@teste.com' }</strong>
        <Link to="/receitas-feitas">
          <button type="button" data-testid="profile-done-btn">
            Receitas Feitas
          </button>
        </Link>
        <Link to="/receitas-favoritas">
          <button type="button" data-testid="profile-favorite-btn">
            Receitas Favoritas
          </button>
        </Link>
        <Button data-testid="profile-logout-btn" onClick={ handleRedirecToLogin }>
          Sair
        </Button>
      </Wrapper>
    </div>
  );
}

export default Profile;
