import React from 'react';

export default function RenderIngredients(ingredients, measure) {
  return (
    <ul>
      { ingredients.map((item, index) => (
        item !== '' && (
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {`${item} - ${measure[index]} un`}
          </li>
        )
      ))}
    </ul>
  );
}
