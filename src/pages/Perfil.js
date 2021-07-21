import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../style/Perfil.css';
import FoodContext from '../contexts/FoodContext';

let counter = 0;

export default function Perfil() {
  const { setColor } = useContext(FoodContext);
  const context = useContext(FoodContext);
  console.log('contexto', context);
  let email;
  console.log('contador de fora: ', counter);
  if (localStorage.user) {
    email = JSON.parse(localStorage.getItem('user')).email;
  }

  function switchTheme() {
    if (counter % 2 === 0) {
      document.body.style.backgroundColor = 'rgb(30, 30, 30)';
      document.body.style.color = 'white';
      counter += 1;
      setColor({
        ...context.color,
        colorP: 'white',
        colorDiv: 'rgb(30,30,30)',
        colorH1: 'white',
        colorH2: 'white',
        colorH3: 'white',
        colorLi: 'white',
      });
      console.log('contador: ', counter);
    } else if (counter % 2 === 1) {
      document.body.style.backgroundColor = 'whitesmoke';
      document.body.style.color = 'rgb(30, 30, 30)';
      counter += 1;
      console.log('contador: ', counter);
      setColor({
        ...context.color,
        colorP: 'black',
        colorDiv: 'whitesmoke',
        colorH1: 'black',
        colorH2: 'black',
        colorH3: 'black',
        colorLi: 'black',
      });
    }
  }

  return (
    <div className="profile-main">
      <Header
        title="Profile"
        enableSearchIcon={ false }
      />
      <h2 data-testid="profile-email" className="profile-head-email">
        { email }
      </h2>
      <button
        type="button"
        className="button"
        onClick={ switchTheme }
      >
        Switch Theme
      </button>
      <br />
      <Link to="/receitas-feitas">
        <button
          className="button is-primary"
          type="submit"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>
      <br />
      <Link to="/receitas-favoritas">
        <button
          className="button is-primary"
          type="submit"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>
      <br />
      <Link to="/">
        <button
          className="button is-danger"
          type="submit"
          data-testid="profile-logout-btn"
          onClick={ () => localStorage.clear() }
        >
          Logout
        </button>
      </Link>
      <Footer />
    </div>
  );
}
