import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import styleCard, { styleBtn } from './index.style';
import clearLS from '../../services/localStorage/clearLS';
import Header from '../../components/Header';

const ProfileScreen = () => {
  const { setLogout } = useContext(Context);

  const handleClick = ({ target }) => {
    console.log(target);
    if (target.id === 'recipes-made') {
      console.log('Receitas feitas clicked!');
    }
    if (target.id === 'recipes-fav') {
      console.log('Receitas fav clicked!');
    }
    if (target.id === 'logout') {
      console.log('Logout clcikec!');
      setLogout(true); // setando variavel "logout" para verdadeiro, usuário deslogado!
      clearLS();
    }
  };

  return (
    <>
      <Header />
      <div className="card" style={ styleCard }>
        <h5 className="card-title">Perfil</h5>
        <span data-testid="profile-email">email@mail.com</span>
        <div className="btn-group-vertical">
          <Link
            to="/receitas-feitas"
            style={ styleBtn }
          >
            <button
              id="recipes-made"
              type="button"
              data-testid="profile-done-btn"
              onClick={ handleClick }
              className="btn btn-primary"
            >
              Receitas Feitas
            </button>
          </Link>
          <Link
            to="receitas-favoritas"
            style={ styleBtn }
          >
            <button
              id="recipes-fav"
              type="button"
              data-testid="profile-favorite-btn"
              className="btn btn-primary"
              onClick={ handleClick }
            >
              Receitas Favoritas
            </button>
          </Link>
          <Link
            to="/"
            style={ styleBtn }
          >
            <button
              id="logout"
              type="button"
              data-testid="profile-logout-btn"
              className="btn btn-danger"
              onClick={ handleClick }
            >
              Sair
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileScreen;
