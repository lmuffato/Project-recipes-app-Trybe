import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';

function ProfilePage() {
  const [email, setEmail] = React.useState();
  const history = useHistory();
  React.useEffect(() => {
    const emailStore = localStorage.getItem('user');
    setEmail(emailStore.split('"')[3]);
  }, []);

  const logoutFunc = () => {
    localStorage.clear();
    history.push('/');
  };

  const redirect = ({ target }) => {
    if (target.id === 'done') {
      history.push('/receitas-feitas');
    } else {
      history.push('/receitas-favoritas');
    }
  };

  return (
    <>
      <Header title="Perfil" />
      <p data-testid="profile-email">{email}</p>
      <button
        type="button"
        id="done"
        data-testid="profile-done-btn"
        onClick={ redirect }
      >
        Receitas Feitas
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ redirect }
      >
        Receitas Favoritas
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ logoutFunc }
      >
        Sair
      </button>
      <Footer />
    </>
  );
}

export default ProfilePage;
