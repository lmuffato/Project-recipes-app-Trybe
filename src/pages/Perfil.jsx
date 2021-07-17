import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';

const Perfil = () => {
  const [user, setUser] = useState('Faça login...');
  const userEmail = () => {
    if ((window.localStorage).length > 0) {
      setUser(JSON.parse(window.localStorage.getItem('user')));
    }
  };

  useEffect(() => {
    userEmail();
  }, []);

  const history = useHistory();
  const logout = () => {
    window.localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      <Header title="Perfil" />
      <Container>
        <h2 data-testid="profile-email">
          { Object.values(user) }
        </h2>
        <Link to="/receitas-feitas">
          <button data-testid="profile-done-btn" type="button">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Receitas Favoritas
          </button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logout }
        >
          Sair
        </button>
      </Container>
      <LowerMenu />
    </div>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    margin-top: 20px;
  }

  a button {
    background: #FFFFFF;
    box-shadow: 0px 4px 4px rgb(0 0 0 / 25%);
    border-radius: 6px;
    border: 0.5px solid gray;
    width: 322px;
    font-family: Montserrat;
    font-size: 30px;
    margin-top: 20px;
  }

  > button {
    width: 322px;
    height: 50px;
    border-radius: 50px;
    color: white;
    font-family: Arial,Helvetica,sans-serif;
    font-weight: 600;
    background-color: #d10e00;
    margin-top: 50px;

    &:hover{
      background-color: #eb0000;
    }
  }
`;

export default Perfil;
