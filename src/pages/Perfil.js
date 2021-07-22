import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodContext from '../contexts/FoodContext';
import '../style/Perfil.css';

let counter = 0;
const TWO_SECONDS = 2000;

export default function Perfil() {
  const { setColor } = useContext(FoodContext);
  const context = useContext(FoodContext);
  console.log('contexto', context);
  let email;
  console.log('contador de fora: ', counter);
  if (localStorage.user) {
    email = JSON.parse(localStorage.getItem('user')).email;
  }

  function themeMessage(theme) {
    const msg = document.createElement('p');
    msg.innerText = `- ${theme} Theme -`;

    const divmsg = document.getElementById('theme-message');
    divmsg.style.backgroundColor = 'whitesmoke';
    divmsg.style.color = 'black';
    divmsg.style.borderRadius = '8px';
    divmsg.style.marginTop = '20px';
    divmsg.appendChild(msg);

    setTimeout(() => {
      msg.remove();
    }, TWO_SECONDS);
  }

  function switchTheme() {
    if (counter === 0) {
      document.body.style.backgroundColor = 'rgb(30, 30, 30)';
      document.body.style.color = 'white';
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
      counter += 1;
      themeMessage('Black');
    } else if (counter === 1) {
      document.body.style.backgroundColor = 'whitesmoke';
      document.body.style.color = 'rgb(30, 30, 30)';
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
      themeMessage('Whitesmoke');
      counter += 1;
    } else if (counter === 2) {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'cyan';
      counter += 1;
      console.log('contador: ', counter);
      setColor({
        ...context.color,
        colorP: 'cyan',
        colorDiv: 'black',
        colorH1: 'cyan',
        colorH2: 'cyan',
        colorH3: 'cyan',
        colorLi: 'cyan',
      });
      themeMessage('Futuristic');
      counter -= 3;
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
      <div id="theme-message" />
      <Footer />
    </div>
  );
}
