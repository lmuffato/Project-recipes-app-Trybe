import React from 'react';
import {
  Image,
  Heading,
  Ingredients,
  Instructions,
  Recommends,
  ButtonStartRecipe,
} from './components/index';

const DetailsDrinkRecipe = () => {
  const instructions = 'Instrucoes para fazer capirinha, comece cortando o limão...';
  // const drink
  return (
    <>
      <Image />
      <Heading />
      <Ingredients />
      <Instructions instruc={ instructions } />
      <Recommends />
      <ButtonStartRecipe />
    </>
  );
};

export default DetailsDrinkRecipe;
