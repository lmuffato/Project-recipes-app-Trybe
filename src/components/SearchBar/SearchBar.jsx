import React, { useCallback, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useFetchRecipes from '../../effects/useFetchRecipes';
import useFilteredRecipes from '../../hooks/useFilteredRecipes';
import Button from '../Generics/Button';
import ResetSearchBarFiltersButton from './ResetSearchBarFiltersButton';
import SearchBarContainer from './styles';
import { RecipesContext } from '../../context/RecipesContext';

function SearchBar({ type }) {
  const [inputSearch, setInputSearch] = useState('');
  const [radioValue, setRadioValue] = useState('');
  const { searchBarFilters,
    setSearchBarFilters, setFilteredRecipes } = useFilteredRecipes();
  const [, setFetchUrl] = useFetchRecipes(type);
  const { recipesContext } = useContext(RecipesContext);

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

  useEffect(() => {
    if (type === 'meals') return setFetchUrl('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    return setFetchUrl('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  }, [setFetchUrl, type]);

  const handleResetFilters = useCallback((ev) => {
    ev.preventDefault();
    setInputSearch('');
    setRadioValue('');
    setSearchBarFilters([]);
    if (recipesContext[type]) setFilteredRecipes(recipesContext[type]);
  }, [recipesContext, setFilteredRecipes, setSearchBarFilters, type]);

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
