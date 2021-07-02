import React from 'react';

function HeaderSearchbar() {
  return (
    <div>
      <input type="text" data-testid="search-input" />
      <input type="radio" data-testid="ingredient-search-radio" />
      <input type="radio" data-testid="name-search-radio" />
      <input type="radio" data-testid="first-letter-search-radio" />
      <button type="button" data-testid="exec-search-btn">Buscar</button>
    </div>
  );
}

export default HeaderSearchbar;
