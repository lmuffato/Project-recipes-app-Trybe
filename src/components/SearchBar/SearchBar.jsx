import React from 'react';

// mudar depois de acordo com requisito
function SearchBar() {
  // const [isActive, setIsActive] = useState(false);

  return (
    <div>
      <input type="text" placeholder="Buscar receita" />
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
        />
        Name
      </label>
      <label htmlFor="first-letter">
        <input
          type="radio"
          name=""
          id="first-letter"
        />
        First letter
      </label>
    </div>
  );
}

export default SearchBar;
