import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import styleCard, { styleBtn } from './index.style';
// import clearLS from '../../services/localStorage/clearLS';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const ProfileScreen = () => {
  const {
    setLogout,
    setFavRecipes,
    setInfoFav,
    setDoneRecipes,
    setInfoDone,
  } = useContext(Context);
  const user = JSON.parse(localStorage.getItem('user'));

  const handleClick = ({ target }) => {
    if (target.id === 'recipes-made') {
      const infoDone = JSON.parse(localStorage.getItem('doneRecipes'));
      if (infoDone !== true) {
        setDoneRecipes(infoDone);
        setInfoDone(infoDone);
      }
    }
    if (target.id === 'recipes-fav') {
      const infoFavorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setInfoFav(infoFavorite);
      setFavRecipes(infoFavorite);
      console.log(infoFavorite);
    }
    if (target.id === 'logout') {
      console.log('Logout clcikec!');
      setLogout(true); // setando variavel "logout" para verdadeiro, usuário deslogado!
      // clearLS();
      localStorage.setItem('user', JSON.stringify({}));
    }
  };

  return (
    <>
      <Header />
      <div className="card" style={ styleCard }>
        <h5 className="card-title">Perfil</h5>
        { (user) && <span data-testid="profile-email">{ user.email }</span> }
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
      <Footer />
    </>
  );
};

export default ProfileScreen;
