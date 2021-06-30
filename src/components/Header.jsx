import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import profileSvg from '../images/profileIcon.svg';
import searchSvg from '../images/searchIcon.svg';

import useRecipe from '../hooks/useRecipe';

import { fetchIngredient, fetchName, fetchFirstLetter } from '../services/data';

export default function Header({ title, searchIcon = false }) {
  const { setRecipe, recipe } = useRecipe();

  const [searchResult, setSearchResult] = useState('');
  const [selectedSearch, setSelectedSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  const history = useHistory();
  const { pathname } = history.location;
  const recipeKeyName = pathname === '/comidas' ? 'meals' : 'drinks';

  const getRecipe = () => {
    const site = pathname === '/comidas' ? 'meal' : 'cocktail';

    switch (selectedSearch) {
    case 'ingredient':
      return fetchIngredient(site, searchResult);
    case 'name':
      return fetchName(site, searchResult);
    case 'firstLetter':
      if (searchResult.length === 1) {
        return fetchFirstLetter(site, searchResult);
      }
      alert('Sua busca deve conter somente 1 (um) caracter');
      return { meals: [], drinks: [] };
    default:
      return { meals: [], drinks: [] };
    }
  };

  const getSearch = async () => {
    const recipeResponse = await getRecipe();
    setRecipe(recipeResponse);
  };

  const redirectToMealOrDrink = () => {
    const foods = recipe[recipeKeyName];
    const idFood = pathname === '/comidas' ? 'idMeal' : 'idDrink';

    if (foods.length === 1 && foods) {
      history.push(`${pathname}/${foods[0][idFood]}`);
    }
  };

  redirectToMealOrDrink();

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
