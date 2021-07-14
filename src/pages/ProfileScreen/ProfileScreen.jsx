import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, ButtonGroup } from 'react-bootstrap';
import Context from '../../context/Context';
import clearLS from '../../services/localStorage/clearLS';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import './Style.css';

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
      console.log('Logout clciked!');
      setLogout(true); // setando variavel "logout" para verdadeiro, usuário deslogado!
      clearLS();
    }
  };

  return (
    <>
      <Header />
      <Form className="form">
        { (user) && <span data-testid="profile-email">{ user.email }</span> }
        <ButtonGroup vertical>

          <Link
            to="/receitas-feitas"
          >
            <Button
              variant="custom"
              id="recipes-made"
              type="button"
              data-testid="profile-done-btn"
              onClick={ handleClick }
            >
              Receitas Feitas
            </Button>
          </Link>
          <Link
            to="receitas-favoritas"
          >
            <Button
              variant="custom"
              id="recipes-fav"
              type="button"
              data-testid="profile-favorite-btn"
              onClick={ handleClick }
            >
              Receitas Favoritas
            </Button>
          </Link>
          <Link
            to="/"
          >
            <Button
              variant="custom-light"
              id="logout"
              type="button"
              data-testid="profile-logout-btn"
              onClick={ handleClick }
            >
              Sair
            </Button>
          </Link>
        </ButtonGroup>
      </Form>
      <Footer />
    </>
  );
};

export default ProfileScreen;
