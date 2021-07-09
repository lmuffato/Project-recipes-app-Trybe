import React from 'react';

export default function RenderCheckboxIngredients(ingredients, measure) {
  return (
    <>
      { ingredients.map((item, index) => {
        if (item !== '') {
          const name = `${item} - ${measure[index]}`;
          let value = false;
          const handleValue = () => {
            value = !value;
          };
          return (
            <div key={ name }>
              <label htmlFor="ingredient">
                {name}
                <input
                  name="ingredient"
                  checked={ value }
                  onChange={ handleValue }
                  type="checkbox"
                  data-testid={ `${index}-ingredient-step` }
                />
              </label>
            </div>
          );
        }
        return '';
      })}
    </>
  );
}
