import React from 'react';
// import { Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import context from '../store/Context';

function Profile() {
  // const { infoUser } = useContext(context);
  // const { email } = infoUser;
  // if (redirectDone) return <Redirect to="/receitas-feitas" />;
  // if (redirectFavorites) return <Redirect to="/receitas-favoritas" />;
  // if (redirectLogin) return <Redirect to="/" />;
  return (
    <>
      <Header title="Perfil" searchBtn={ false } />
      {/* <p data-testid="profile-email">{ email }</p>
      <button
        type="button"
        data-testid="profile-done-btn"
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
      >
        sair
      </button> */}
      <Footer />
    </>
  );
}

export default Profile;
