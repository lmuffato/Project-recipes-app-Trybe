import React from 'react';
import { Link } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [showSearch, setShowSearch] = React.useState(false);

  const searchInputs = () => (
    <>
      <input data-testid="search-input" />
      <label htmlFor="ingredient">
        <input
          id="ingredient"
          type="radio"
          data-testid="ingredient-search-radio"
          value="Ingrediente"
          name="search"
        />
        Ingrediente
      </label>
      <label htmlFor="name">
        <input
          type="radio"
          id="name"
          data-testid="name-search-radio"
          value="Nome"
          name="search"
        />
        Nome
      </label>
      <label htmlFor="first-letter">
        <input
          id="first-letter"
          type="radio"
          data-testid="first-letter-search-radio"
          value="Primeira letra"
          name="search"
        />
        Primeira letra
      </label>
      <br />
      <button data-testid="exec-search-btn" type="button">Buscar</button>
    </>
  );

  return (
    <section>
      <header>
        <Link to="/perfil">
          <button type="button" data-testid="profile-top-btn">
            <img src={ profileIcon } alt="profile user" />
          </button>
        </Link>
        <button
          type="button"
          data-testid="search-top-btn"
          onClick={ () => setShowSearch(!showSearch) }
        >
          <img src={ searchIcon } alt="search bar" />
        </button>
      </header>
      {showSearch && searchInputs() }
    </section>
  );
}

export default Header;
