import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import CocktailsContext from '../context/CocktailsContext';
import MealsContext from '../context/MealsContext';
import {
  ApiByCocktailIngredient,
  ApiByCocktailName,
  ApiByCocktailFirstLetter } from '../services/theCockTailAPI';
import { ApiByFirstLetter, ApiByIngredient, ApiByName } from '../services/theMealAPI';

export default function SearchBar({ props }) {
  const [searchValue, setSearchValue] = useState({
    search: '',
    check: '',
  });

  const history = useHistory();

  const { setMeals } = useContext(MealsContext);
  const { setCocktails } = useContext(CocktailsContext);
  const { match } = props;
  const firstLetter = 'first-letter';

  const pushMealDetails = (results) => {
    const { meals } = results;

    if (meals === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (meals && meals.length === 1) {
      const mealId = meals[0].idMeal;
      history.push(`/comidas/${mealId}`);
    }
  };

  const pushCocktailDetails = (results) => {
    const { drinks } = results;
    if (drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    }
    if (drinks && drinks.length === 1) {
      const drinkId = drinks[0].idDrink;
      history.push(`/bebidas/${drinkId}`);
    }
  };

  const handleClick = async () => {
    const { search, check } = searchValue;
    const uRl = match.path;
    if (check === 'ingredient' && uRl === '/comidas') {
      const results = await ApiByIngredient(search);
      pushMealDetails(results);
      setMeals(results);
    }
    if (check === 'ingredient' && uRl === '/bebidas') {
      const results = await ApiByCocktailIngredient(search);
      pushCocktailDetails(results);
      setCocktails(results);
    }
    if (check === 'name' && uRl === '/comidas') {
      const results = await ApiByName(search);
      pushMealDetails(results);
      setMeals(results);
    }
    if (check === 'name' && uRl === '/bebidas') {
      const results = await ApiByCocktailName(search);
      pushCocktailDetails(results);
      setCocktails(results);
    }
    if (check === firstLetter && uRl === '/comidas') {
      const results = await ApiByFirstLetter(search);
      pushMealDetails(results);
      setMeals(results);
    }
    if (check === firstLetter && uRl === '/bebidas') {
      const results = await ApiByCocktailFirstLetter(search);
      pushCocktailDetails(results);
      setCocktails(results);
    }
  };

  const handleChange = ({ target }) => {
    const { check, search } = searchValue;
    if (search.length > 1 && check === firstLetter) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (target.name === 'check') {
      setSearchValue({ ...searchValue, check: target.value });
    } else {
      setSearchValue({ ...searchValue, search: target.value });
    }
  };

  return (
    <form>
      <input
        type="text"
        data-testid="search-input"
        onChange={ handleChange }
      />
      <label htmlFor="ingredients-radio">
        <input
          id="ingredients-radio"
          type="radio"
          name="check"
          value="ingredient"
          data-testid="ingredient-search-radio"
          onChange={ handleChange }
        />
        Ingrediente
      </label>
      <label htmlFor="name-radio">
        <input
          id="name-radio"
          type="radio"
          name="check"
          value="name"
          data-testid="name-search-radio"
          onChange={ handleChange }
        />
        Nome
      </label>
      <label htmlFor="firstLetter-radio">
        <input
          id="firstLetter-radio"
          type="radio"
          name="check"
          value={ firstLetter }
          data-testid="first-letter-search-radio"
          onChange={ handleChange }
        />
        Primeira letra
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </form>
  );
}

SearchBar.propTypes = {
  props: PropTypes.object,
}.isRequired;
