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
    <div>
      <input type="text" />
      {generateRadioButtons('name', 'label', 'onChange', 'dataTest')}
      {generateRadioButtons('name', 'label', 'onChange', 'dataTest')}
      {generateRadioButtons('name', 'label', 'onChange', 'dataTest')}
    </div>
  );
}
