import React, { useContext } from 'react';
import {
  Image,
  Heading,
  Ingredients,
  Instructions,
  VideoComponent,
  Recommends,
  ButtonStartRecipe,
} from './components/index';
import Context from '../../context/Context';

const DetailsFoodRecipe = () => {
  // const instructions = 'Instrucoes para fazer coxinha, comece cozinhando o frango...';
  const { recipeFood } = useContext(Context); // variavel q guarda a receita
  // const { }
  console.log(recipeFood);
  return (
    <>
      <Image recipe={ recipeFood } />
      <Heading recipe={ recipeFood } />
      <Ingredients recipe={ recipeFood } />
      <Instructions recipe={ recipeFood } />
      <VideoComponent />
      <Recommends />
      <ButtonStartRecipe />
    </>
  );
};

export default DetailsFoodRecipe;
