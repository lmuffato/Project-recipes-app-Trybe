import React from 'react';

export default function listOfIngredients({ idFood }) {
  const retObj = Object.entries(idFood);
  const listIngredients = retObj.filter((meal) => (
    meal[0].includes('Ingredient') && meal[1]
  ));
  // console.log(listIngredients);

  return (
    <ul>
      {listIngredients.map((ingredient, index) => (
        <li
          key={ index }
          data-testid={ `${index}-ingredient-name-and-measure` }
        >
          {ingredient[1]}
        </li>
      ))}
    </ul>
  );
}
