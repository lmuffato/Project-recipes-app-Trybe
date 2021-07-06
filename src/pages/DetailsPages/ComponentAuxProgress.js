import React from 'react';

import {
  Image,
  Heading,
  Ingredients,
  Instructions,
  Recommends,
} from './components/index';

function ComponentAuxProgress(recipe) {
  const { recipeFood, recipeDrink } = recipe;
  console.log(recipeDrink);

  return (
    <div className="container">
      <Image recipe={ recipeFood || recipeDrink } />
      <Heading recipe={ recipeFood || recipeDrink } />
      <Ingredients recipe={ recipeFood || recipeDrink } />
      <Instructions recipe={ recipeFood || recipeDrink } />
      {recipeDrink ? <Recommends /> : <Recommends drink />}
      <button
        type="button"
        // onClick={ () => doneRecipe(recipe) }
      >
        Finalizar Receita
      </button>
    </div>
  );
}

export default ComponentAuxProgress;
