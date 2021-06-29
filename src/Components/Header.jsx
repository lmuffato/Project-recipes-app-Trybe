import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FoodContext } from '../Context/FoodProvider';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ page }) {
  const [showSearch, setShowSearch] = React.useState(false);
  const {
    setRadioSelected,
    setSearchText,
    setCurrentPage } = React.useContext(FoodContext);

  const handleClick = () => {
    const radios = document.querySelectorAll('[name="search"]');
    const searchInput = document.querySelector('#searchInput');
    for (let i = 0; i < radios.length; i += 1) {
      if (radios[i].checked) {
        setRadioSelected(radios[i].value);
        if (radios[i].value === 'Primeira letra' && searchInput.value.length !== 1) {
          alert('Sua busca deve conter somente 1 (um) caracter');
        }
      }
    }
    setSearchText(searchInput.value);
    setCurrentPage(page);
  };

  const searchInputs = () => (
    <>
      <input data-testid="search-input" id="searchInput" />
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
      <button
        data-testid="exec-search-btn"
        type="button"
        onClick={ handleClick }
      >
        Buscar
      </button>
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

Header.propTypes = {
  pages: PropTypes.string,
}.isRequired;

export default Header;
