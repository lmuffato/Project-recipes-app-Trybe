import React, { useCallback, useState } from 'react';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import Button from '../Generics/Button';
import SearchBarContainer from './styles';

function SearchBar() {
  const [inputSearch, setInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { searchBarFilters, setSearchBarFilters } = useFilteredRecipes();

  // configura o onChange dos radio inputs
  const handleChange = useCallback((event) => {
    setRadioValue(event.target.value);
  }, []);

  // submit do botão de busca, coloca os filtros num array que servirá de trigger para o fetch no contexto
  const handleSubmit = useCallback((ev) => {
    ev.preventDefault();
    console.log(inputSearch, radioValue);
    setSearchBarFilters(
      searchBarFilters.concat({
        radioValue,
        inputSearch,
      }),
    );
    console.log(searchBarFilters);
  }, [inputSearch, radioValue, searchBarFilters, setSearchBarFilters]);

  return (
    <SearchBarContainer>
      <input
        type="text"
        placeholder="Buscar receita"
        data-testid="search-input"
        value={ inputSearch }
        onChange={ (ev) => setInputSearch(ev.target.value) }
      />
      <div className="form-control">
        <label htmlFor="ingredient">
          <input
            type="radio"
            checked={ radioValue === 'ingredient' }
            id="ingredient"
            value="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (ev) => handleChange(ev) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            checked={ radioValue === 'name' }
            id="name"
            value="name"
            data-testid="name-search-radio"
            onChange={ (ev) => handleChange(ev) }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            checked={ radioValue === 'first-letter' }
            id="first-letter"
            value="first-letter"
            data-testid="first-letter-search-radio"
            onChange={ (ev) => handleChange(ev) }
          />
          First letter
        </label>
      </div>
      <Button
        data-testid="exec-search-btn"
        onClick={ (ev) => handleSubmit(ev) }
      >
        Buscar
      </Button>
    </SearchBarContainer>
  );
}

export default SearchBar;
