import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../components/Header';
import LowerMenu from '../components/LowerMenu';
import ExitIcon from '../icons/appIcons/sair.png';

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
          <button data-testid="profile-done-btn" type="button">Done Recipes</button>
        </Link>
        <Link to="/receitas-favoritas">
          <button
            data-testid="profile-favorite-btn"
            type="button"
          >
            Favorite Recipes
          </button>
        </Link>
        <button
          data-testid="profile-logout-btn"
          type="button"
          onClick={ logout }
        >
          <img src={ ExitIcon } alt="Sair" />
          Exit
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
    width: 122px;
    height: 50px;
    border-radius: 50px;
    color: #ffffff;
    font-family: Montserrat;
    font-weight: bold;
    background-color: rgb(173, 135, 31);
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin-top: 50px;
    border: none;

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }

    &:hover{
      background-color: rgb(146, 114, 26);
    }
  }
`;

export default Perfil;
