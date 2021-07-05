import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useFetchRecipes from '../../effects/useFetchRecipes';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import Button from '../Generics/Button';
import ResetSearchBarFiltersButton from './ResetSearchBarFiltersButton';
import SearchBarContainer from './styles';

function SearchBar({ type }) {
  const [inputSearch, setInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { searchBarFilters,
    setSearchBarFilters, setFilteredRecipes, filteredRecipes } = useFilteredRecipes();
  const fetchData = useFetchRecipes(type);

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
    // console.log(searchBarFilters);
  }, [inputSearch, radioValue, searchBarFilters, setSearchBarFilters]);

  const handleResetFilters = useCallback((ev) => {
    ev.preventDefault();
    setInputSearch('');
    setRadioValue('');
    setSearchBarFilters([]);
    if (fetchData[type]) setFilteredRecipes(fetchData[type]);
    console.log(filteredRecipes);
  }, [fetchData, filteredRecipes, setFilteredRecipes, setSearchBarFilters, type]);

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
      <div className="btn-container">
        <Button
          data-testid="exec-search-btn"
          onClick={ (ev) => handleSubmit(ev) }
        >
          Buscar
        </Button>
        <ResetSearchBarFiltersButton onClick={ (ev) => handleResetFilters(ev) } />
      </div>
    </SearchBarContainer>
  );
}

SearchBar.propTypes = {
  type: PropTypes.string.isRequired,
};

export default SearchBar;
