import React from 'react';
import makeObjIngredients from '../../../services/formatObjects/makeObjIngredients';

const Ingredients = ({ recipe }) => {
  const objIngredients = makeObjIngredients(recipe);
  let arrEntries = [];
  if (objIngredients) {
    arrEntries = Object.entries(objIngredients);
  }
  return (
    <>
      <h4>Ingredients</h4>
      <section>
        <ul>
          { arrEntries
            .map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${ingredient[0]} - ${ingredient[1]}`}
              </li>))}
        </ul>
      </section>
    </>
  );
};

export default Ingredients;
