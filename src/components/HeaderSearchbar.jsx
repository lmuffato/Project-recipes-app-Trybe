import React, { useContext } from 'react';
import Context from '../context/Context';

function HeaderSearchbar() {
  const {
    radio,
    setRadio,
    searchInput,
    setSearchInput,
    setPath,
    handleClickFilter,
  } = useContext(Context);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    const pathName = window.location.pathname.substring(1);
    setPath(pathName);
    if (radio === 'Primeira letra' && e.target.value.length > 1) {
      global.alert('Sua busca deve conter somente 1 (um) caracter');
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ (e) => handleChange(e) }
        value={ searchInput }
        disabled={ (radio === '') }
      />
      <div>
        <label
          htmlFor="ingredient-search-radio"
        >
          <input
            type="radio"
            data-testid="ingredient-search-radio"
            name="filter-radio"
            value="Ingrediente"
            onClick={ (e) => setRadio(e.target.value) }
          />
          Ingrediente
        </label>
        <label
          htmlFor="name-search-radio"
        >
          <input
            type="radio"
            data-testid="name-search-radio"
            name="filter-radio"
            value="Nome"
            onClick={ (e) => setRadio(e.target.value) }
          />
          Nome
        </label>
        <label
          htmlFor="first-letter-search-radio"
        >
          <input
            type="radio"
            data-testid="first-letter-search-radio"
            name="filter-radio"
            value="Primeira letra"
            onClick={ (e) => setRadio(e.target.value) }
          />
          Primeira letra
        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClickFilter }
      >
        Buscar
      </button>
    </div>
  );
}

export default HeaderSearchbar;
