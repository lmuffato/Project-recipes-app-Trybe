import React from 'react';

export default function RenderCheckboxIngredients(ingredients, measure) {
  return (
    <div>
      { ingredients.map((item, index) => {
        if (item !== '') {
          const name = `${item} - ${measure[index]}`;
          return (
            <div key={ name }>
              <label htmlFor="ingredient">
                {name}
                <input
                  name="ingredient"
                  type="checkbox"
                  data-testid={ `${index}-ingredient-step` }
                />
              </label>
            </div>
          );
        }
        return '';
      })}
    </div>
  );
}
