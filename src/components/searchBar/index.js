import React from 'react';

function GenerateRadioButtons(name, label, onClick, dataTest) {
  return (
    <label htmlFor={ name }>
      {label}
      <input
        id={ name }
        name={ name }
        onClick={ onClick }
        type="radio"
        data-testid={ dataTest }
      />
    </label>
  );
}

export default function SearchBar() {
  return (
    <div data-testid="search-top-btn">
      <input type="text" />
      {GenerateRadioButtons("name", "label", onClick, 'dataTest')}
    </div>
  );
}
