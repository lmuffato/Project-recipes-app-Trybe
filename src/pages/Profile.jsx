import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';
import { getItemFromLocalStorage } from '../services/localStorage';

export default function Profile() {
  const [user, setUser] = useState('');
  const history = useHistory();

  useEffect(() => {
    const getStorage = () => {
      const userFromStorage = getItemFromLocalStorage('user');
      if (userFromStorage) setUser(userFromStorage.email);
    };
    getStorage();
  }, []);

  const handleClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Perfil</h1>
      </Header>
      <p data-testid="profile-email">{ user }</p>
      <Link to="/receitas-feitas">
        <Button variant="dark" data-testid="profile-done-btn">Receitas Feitas</Button>
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          variant="dark"
          data-testid="profile-favorite-btn"
        >
          Receitas Favoritas
        </Button>
      </Link>
      <Button
        variant="dark"
        data-testid="profile-logout-btn"
        onClick={ handleClick }
      >
        Sair
      </Button>
      <InferiorMenu />
    </div>
  );
}
