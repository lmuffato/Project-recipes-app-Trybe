import React from 'react';
import Button from '../Generics/Button';
import SearchBarContainer from './styles';

function SearchBar() {
  return (
    <SearchBarContainer>
      <input type="text" placeholder="Buscar receita" data-testid="search-input" />
      <div className="form-control">
        <label htmlFor="ingredient">
          <input
            type="radio"
            name=""
            id="ingredient"
            data-testid="ingredient-search-radio"
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            name=""
            id="name"
            data-testid="name-search-radio"
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            name=""
            id="first-letter"
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
      </div>
      <Button data-testid="exec-search-btn">
        Buscar
      </Button>
    </SearchBarContainer>
  );
}

export default SearchBar;
