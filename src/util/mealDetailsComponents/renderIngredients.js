import React from 'react';

export default function RenderIngredients(aux) {
  return (
    <ul>
      { aux.map((item, index) => (
        item !== '' && (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${aux[index]}`}
          </li>
        )
      ))}
    </ul>
  );
}
