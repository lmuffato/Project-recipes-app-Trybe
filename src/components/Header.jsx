import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { fetchSearch } from '../redux/actions';
import './Header.css';

function Header({ props: { search, title } }) {
  const [searchBar, setSearchBar] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const dispatch = useDispatch();
  const data = useSelector((state) => state.searchReducer.data);

  const showSearchBar = () => {
    if (searchBar) setSearchBar(false);
    else setSearchBar(true);
  };

  const showSearchButton = () => {
    if (search) {
      return (
        <button className="no-style-btn" type="button" onClick={ showSearchBar }>
          <img
            src={ searchIcon }
            data-testid="search-top-btn"
            alt="search icon"
          />
        </button>
      );
    }
  };

  const clickSearch = () => {
    if (searchText.length > 1 && radioValue === 'first') {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    } else {
      console.log(window.location.href.split('/')[3]);
      dispatch(fetchSearch(radioValue, searchText, window.location.href.split('/')[3]));
    }
  };

  const renderSearchBar = () => {
    if (searchBar) {
      return (
        <form className="form-search">
          <input
            className="input-search"
            type="text"
            placeholder="Buscar Receita"
            data-testid="search-input"
            onChange={ ({ target }) => setSearchText(target.value) }
          />
          <button
            className="filter-btn"
            type="button"
            data-testid="exec-search-btn"
            onClick={ clickSearch }
          >
            Buscar
          </button>
          <label htmlFor="ingredient">
            <input
              type="radio"
              id="ingredient"
              name="searchRadio"
              data-testid="ingredient-search-radio"
              onChange={ () => setRadioValue('ingredient') }
            />
            Ingrediente
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              id="name"
              name="searchRadio"
              data-testid="name-search-radio"
              onChange={ () => setRadioValue('name') }
            />
            Nome
          </label>
          <label htmlFor="firstLetter">
            <input
              type="radio"
              id="firstLetter"
              name="searchRadio"
              data-testid="first-letter-search-radio"
              onChange={ () => setRadioValue('first') }
            />
            Primeira Letra
          </label>
        </form>
      );
    }
  };

  useEffect(() => {
    if ((data === null) || data === 'error') {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
    if ((data === null) || data === 'error') {
      return (
        global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
      );
    }
  }, [data]);

  return (
    <div>
      <header>
        <Link to="/perfil">
          <img
            src={ profileIcon }
            data-testid="profile-top-btn"
            alt="profile icon"
          />
        </Link>
        <h1
          data-testid="page-title"
        >
          {title}
        </h1>
        { showSearchButton() }
      </header>
      { renderSearchBar() }
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.bool,
}.isRequired;

export default Header;
