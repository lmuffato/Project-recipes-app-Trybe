import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import BottomMenu from '../../components/bottomMenu';
import { getEmail } from '../../services/localStorage';

export default function Profile() {
  const [userEmail, setEmail] = useState('');
  useEffect(() => {
    const setUser = () => {
      const toRead = getEmail('user') ? 'hello' : getEmail('user');
      if (toRead !== null) {
        const { email } = getEmail('user');
        return email;
      }
      return toRead;
    };
    setEmail(setUser());
  }, []);

  const history = useHistory();

  function clearRedirect() {
    window.localStorage.clear();
    history.push('/');
  }

  return (
    <div className="other-pages">
      <Header title="Perfil" show={ false } />
      <p data-testid="profile-email">{ userEmail }</p>
      <button
        type="button"
        onClick={ () => history.push('/receitas-feitas') }
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        onClick={ () => history.push('/receitas-favoritas') }
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => clearRedirect() }
      >
        Sair
      </button>
      <BottomMenu />
    </div>
  );
}
