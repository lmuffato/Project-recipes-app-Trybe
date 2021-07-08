import React from 'react';

export default function RenderIngredients(ingredients, measure) {
  return (
    <ul>
      { ingredients.map((item, index) => {
        if (item !== '') {
          if (measure[index].length > 1) {
            return (
              <li
                key={ index }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item} - ${measure[index]}`}
              </li>
            );
          }
          return (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${item} - ${measure[index]} un`}
            </li>
          );
        }
        return '';
      })}
    </ul>
  );
}
