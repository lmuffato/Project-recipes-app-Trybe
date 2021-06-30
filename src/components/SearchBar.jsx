import React, { useContext, useState } from 'react';
import MealsContext from '../context/MealsContext';
import { ApiByFirstLetter, ApiByIngredient, ApiByName } from '../services/theMealAPI';

export default function SearchBar() {
  const [searchValue, setSearchValue] = useState({
    search: '',
    check: '',
  });

  const { setMeals } = useContext(MealsContext);

  const handleClick = async () => {
    const { search, check } = searchValue;
    console.log(search, check);
    if (check === 'ingredient') {
      const results = await ApiByIngredient(search);
      setMeals(results);
    }
    if (check === 'name') {
      const results = await ApiByName(search);
      setMeals(results);
    }
    if (check === 'first-letter') {
      const results = await ApiByFirstLetter(search);
      setMeals(results);
    }
  };

  const handleChange = ({ target }) => {
    const { check, search } = searchValue;
    if (search.length > 1 && check === 'first-letter') {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (target.name === 'check') {
      setSearchValue({ ...searchValue, check: target.value });
    } else {
      setSearchValue({ ...searchValue, search: target.value });
    }
  };

  return (
    <form data-testid="search-top-btn">
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
          value="first-letter"
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
