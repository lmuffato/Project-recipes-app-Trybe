import React from 'react';
import { useHistory } from 'react-router-dom';
import md5 from 'md5';
import useLocalStorage from '../../hooks/useLocalStorage';

function Perfil() {
  const { user } = useLocalStorage('user');

  const gravatarProfile = `https://www.gravatar.com/avatar/${md5(user.email)}`;

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

      <img src={ gravatarProfile } alt="Imagem de perfil" />
      <h3 data-testid="profile-email">{ user.email }</h3>

      <button
        name="Receitas Feitas"
        type="button"
        data-testid="profile-done-btn"
        onClick={ doneRecipes }
      >
        Receitas Feitas
      </button>
      <button
        name="Receitas Favoritas"
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ favoriteRecipes }
      >
        Receitas Favoritas
      </button>
      <button
        name="Sair"
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logout }
      >
        Sair
      </button>
      <footer>
        <img src="/logo_darkbg.svg" alt="Squarefood" />
      </footer>
    </div>
  );
}

export default Perfil;
