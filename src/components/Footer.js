import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();

  function handleClick(path) {
    history.push(path);
  }

  return (
    <footer className="footer" data-testid="footer">
      <ul>
        <li>
          <button type="button" onClick={ () => handleClick('/bebidas') }>
            <img
              data-testid="drinks-bottom-btn"
              src={ drinkIcon }
              alt="Ícone de drink"
            />
          </button>
        </li>
        <li>
          <button type="button" onClick={ () => handleClick('/explorar') }>
            <img
              data-testid="explore-bottom-btn"
              src={ exploreIcon }
              alt="Ícone de uma bússola"
            />
          </button>
        </li>
        <li>
          <button type="button" onClick={ () => handleClick('/comidas') }>
            <img
              data-testid="food-bottom-btn"
              src={ mealIcon }
              alt="Ícone de uma colher e um garfo"
            />
          </button>
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
