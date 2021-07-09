import React, { useContext } from 'react';
import ContextRecipes from '../context/ContextRecipes';

function SearchBar() {
  const { setSearch, setRadioFilter,
    setSearchBtn, fetchRecipes, search, radioFilter } = useContext(ContextRecipes);

  function alertOneLetter() {
    if (search.length > 1 && radioFilter === 'primeira-letra') {
      return window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  function handleChangeSearch({ target }) {
    setSearch(target.value);
  }

  function handleChangeRadio({ target }) {
    setRadioFilter(target.value);
  }

  return (
    /* Renderiza uma barra de busca com filtros */
    <div>
      <input type="text" data-testid="search-input" onChange={ handleChangeSearch } />

      <label htmlFor="ingredient">
        <input
          name="option"
          type="radio"
          id="ingredient"
          data-testid="ingredient-search-radio"
          value="ingrediente"
          onChange={ handleChangeRadio }
        />
        Ingrediente
      </label>

      <label htmlFor="name">
        <input
          name="option"
          type="radio"
          id="name"
          data-testid="name-search-radio"
          value="nome"
          onChange={ handleChangeRadio }
        />
        Nome
      </label>

      <label htmlFor="firstLetter">
        <input
          name="option"
          type="radio"
          id="firstLetter"
          data-testid="first-letter-search-radio"
          onChange={ handleChangeRadio }
          value="primeira-letra"
        />
        Primeira letra
      </label>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => {
          fetchRecipes();
          setSearchBtn(true);
          alertOneLetter();
        } }

      >
        Buscar
      </button>
    </div>
  );
}
export default SearchBar;
