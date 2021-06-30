import React from 'react';

export default function SearchBar() {
  function generateRadioButtons(name, label, onChange, dataTest) {
    return (
      <label htmlFor={ name }>
        {label}
        <input
          id={ name }
          name={ name }
          onChange={ onChange }
          type="radio"
          data-testid={ dataTest }
        />
      </label>
    );
  }

  return (
    <>
      <input
        data-testid="search-input"
        type="text"
      />

      {generateRadioButtons('name', 'Ingrediente', 'onChange', 'ingredient-search-radio')}
      {generateRadioButtons('name', 'Nome', 'onChange', 'name-search-radio')}
      {generateRadioButtons('name', 'Primeira letra',
        'onChange', 'first-letter-search-radio')}
      <button
        data-testid="exec-search-btn"
        type="button"
      >
        Buscar

      </button>
    </>
  );
}
