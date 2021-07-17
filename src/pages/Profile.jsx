import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';
import { getItemFromLocalStorage } from '../services/localStorage';
import '../CSS/Profile.css';

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
        <p className="eMailProfile" data-testid="profile-email">{ user }</p>
      </Header>
      <div className="categoriesButtonsDiv">
        <Link to="/receitas-feitas">
          <Button
            className="exploreButtons"
            data-testid="profile-done-btn"
          >
            Receitas Feitas
          </Button>
        </Link>
        <Link to="/receitas-favoritas">
          <Button
            className="exploreButtons"
            variant="dark"
            data-testid="profile-favorite-btn"
          >
            Receitas Favoritas
          </Button>
        </Link>
        <Button
          className="exploreButtons"
          variant="dark"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          Sair
        </Button>
      </div>
      <InferiorMenu />
    </div>
  );
}
