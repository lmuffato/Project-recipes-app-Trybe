import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Button from '../../components/shared/button';
import Header from '../../components/Header';

function Perfil() {
  const storage = localStorage.getItem('user');
  const { email } = storage ? JSON.parse(storage) : '@gmail.com';

  return (
    <>
      <Header pageTitle="Perfil" showButton={ false } />
      <span
        data-testid="profile-email"
      >
        {email !== '' ? email : 'NeymarJunior@gmail.com'}
      </span>
      <Link to="/receitas-feitas">
        <Button
          dataTestid="profile-done-btn"
          name="Receitas Feitas"
        />
      </Link>
      <Link to="/receitas-favoritas">
        <Button
          dataTestid="profile-favorite-btn"
          name="Receitas Favoritas"
        />
      </Link>
      <Link to="/">
        <Button
          onClick={ () => localStorage.clear() }
          dataTestid="profile-logout-btn"
          name="Sair"
        />
      </Link>
      <Footer />
    </>
  );
}

export default Perfil;
