import React from 'react';
import { useHistory } from 'react-router-dom';
import HeaderBack from '../../components/HeaderBack';
import styles from './styles.module.scss';
import useLocalStorage from '../../hooks/useLocalStorage';
import Footer from '../../components/footer';

function Perfil() {
  /* const emailReceived = localStorage.getItem('email');
  const emailConverted = JSON.stringify(emailReceived);
  const emailUser = emailConverted.replace(/"/g, '');
  const gravatarProfile = `https://www.gravatar.com/avatar/${md5(emailUser)}`; */

  const { gravatar } = useLocalStorage('gravatar');
  const user = JSON.parse(localStorage.getItem('user'));
  const { email } = user;

  const history = useHistory();
  const logout = (event) => {
    event.preventDefault();
    localStorage.clear();
    history.push('/');
  };
  const doneRecipes = (event) => {
    event.preventDefault();
    history.push('/receitas-feitas');
  };
  const favoriteRecipes = (event) => {
    event.preventDefault();
    history.push('/receitas-favoritas');
  };
  return (
    <div>
      <HeaderBack />
      <div className={ styles.perfilPage }>
        <div className={ styles.imagemEmail }>
          <img src={ gravatar } alt="Imagem de perfil" />
          <h3 data-testid="profile-email">{ email }</h3>
        </div>
        <button
          name="Receitas Feitas"
          type="button"
          className="primary-btn"
          data-testid="profile-done-btn"
          onClick={ doneRecipes }
        >
          Receitas Feitas
        </button>
        <button
          name="Receitas Favoritas"
          type="button"
          className="primary-btn"
          data-testid="profile-favorite-btn"
          onClick={ favoriteRecipes }
        >
          Receitas Favoritas
        </button>
        <button
          name="Sair"
          type="button"
          className="primary-btn"
          data-testid="profile-logout-btn"
          onClick={ logout }
        >
          Sair
        </button>
        <footer>
          <img src="/logo_darkbg.svg" alt="Squarefood" />
        </footer>
        <Footer />
      </div>
    </div>
  );
}

export default Perfil;
