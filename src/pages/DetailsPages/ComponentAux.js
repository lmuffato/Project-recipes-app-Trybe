import React from 'react';

import {
  Image,
  Heading,
  Ingredients,
  Instructions,
  VideoComponent,
  Recommends,
  ButtonMakeRecipeFood,
  ButtonMakeRecipeDrink,
} from './components/index';

function ComponentAux(recipe) {
  const { recipeFood, recipeDrink } = recipe;
  // console.log(recipeFood);
  return (
    <>
      <Image recipe={ recipeFood || recipeDrink } />
      <Heading recipe={ recipeFood || recipeDrink } />
      <div className="container">
        <Ingredients recipe={ recipeFood || recipeDrink } />
        <Instructions recipe={ recipeFood || recipeDrink } />
        { recipeDrink ? null : <VideoComponent recipe={ recipeFood } />}
        {recipeDrink ? <Recommends /> : <Recommends drink />}
      </div>
      { recipeFood ? <ButtonMakeRecipeFood recipe={ recipeFood } />
        : <ButtonMakeRecipeDrink recipe={ recipeDrink } />}
    </>
  );
}

export default ComponentAux;
