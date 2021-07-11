import React from 'react';
import { string, bool } from 'prop-types';
import profileSvg from '../images/profileIcon.svg';
import searchSvg from '../images/searchIcon.svg';
import useSearch from '../hooks/useSearch';

export default function Header({ title, searchIcon = false }) {
  const {
    setSearchResult,
    setSelectedSearch,
    showSearch,
    setShowSearch,
    foodsRecipe,
    getSearch,
    history,
    redirectToMealOrDrink,
  } = useSearch();

  if (!foodsRecipe) {
    global.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
  }

  if (foodsRecipe) redirectToMealOrDrink();

  return (
    <header>
      <button type="button" onClick={ () => history.push('/perfil') }>
        <img
          data-testid="profile-top-btn"
          src={ profileSvg }
          alt="Profile Avatar"
        />
      </button>

      <h1 data-testid="page-title">{title}</h1>

      {searchIcon && (
        <button type="button" onClick={ () => setShowSearch(!showSearch) }>
          <img src={ searchSvg } alt="Search" data-testid="search-top-btn" />
        </button>
      )}

      <div>
        {showSearch && (
          <div>
            <input
              data-testid="search-input"
              placeholder="Buscar Receita"
              onChange={ ({ target }) => setSearchResult(target.value) }
            />

            <label htmlFor="ingredient-search-radio">
              Ingrediente
              <input
                data-testid="ingredient-search-radio"
                type="radio"
                name="search-radio"
                id="ingredient-search-radio"
                value="ingredient"
                onChange={ ({ target }) => setSelectedSearch(target.value) }
              />
            </label>

            <label htmlFor="name-search-radio">
              Nome
              <input
                data-testid="name-search-radio"
                type="radio"
                name="search-radio"
                id="name-search-radio"
                value="name"
                onChange={ ({ target }) => setSelectedSearch(target.value) }
              />
            </label>

            <label htmlFor="first-letter-search-radio">
              Primeira letra
              <input
                data-testid="first-letter-search-radio"
                type="radio"
                name="search-radio"
                id="first-letter-search-radio"
                value="firstLetter"
                onChange={ ({ target }) => setSelectedSearch(target.value) }
              />
            </label>

            <button
              data-testid="exec-search-btn"
              type="button"
              onClick={ getSearch }
            >
              Buscar
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

Header.propTypes = {
  title: string,
  searchIcon: bool,
}.isRequired;
