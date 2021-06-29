import React from 'react';

// mudar depois de acordo com requisito
function SearchBar() {
  return (
    <div>
      <label htmlFor="ingredient">
        Ingredient
        <input
          type="radio"
          name=""
          id="ingredient"
          data-testid="ingredient-search-radio"
        />
      </label>
      <label htmlFor="name">
        Name
        <input
          type="radio"
          name=""
          id="name"
        />
      </label>
      <label htmlFor="first-letter">
        First letter
        <input
          type="radio"
          name=""
          id="first-letter"
        />
      </label>
    </div>
  );
}

export default SearchBar;
