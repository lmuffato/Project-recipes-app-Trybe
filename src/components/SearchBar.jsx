import React, { useContext } from 'react';
import { useLocation } from 'react-router';
import ContextRecipes from '../context/ContextRecipes';

function SearchBar() {
  const { setSearch, setRadioFilter,
    setSearchBtn, fetchRecipes, search, radioFilter } = useContext(ContextRecipes);
  const { pathname } = useLocation();

  /*  Ternário pra identificar a rota da página e enviá-la pro filtro de comidas/bebidas */
  const link = pathname === '/comidas' ? 'mealdb' : 'cocktaildb';

  /* Alerta quando mais de um caracter é escrito na opção de filtro primeira letra */
  function alertOneLetter() {
    if (search.length > 1 && radioFilter === 'primeira-letra') {
      return window.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  }

  /* Captura o valor da barra de input */
  function handleChangeSearch({ target }) {
    setSearch(target.value);
  }

  /* Captura o valor do input radio selecionado */
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
        onClick={ async () => {
          await fetchRecipes(link);
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
