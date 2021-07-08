import React from 'react';
import { Link } from 'react-router-dom';
import doneRecipes from '../../services/localStorage/doneRecipes';
import {
  Image,
  Heading,
  IngredientsRadios,
  Instructions,
  Recommends,
} from './components/index';

function ComponentAuxProgress(recipe) {
  const { recipeFood, recipeDrink } = recipe;
  // console.log(recipeDrink);
  return (
    <div className="container">
      <Image recipe={ recipeFood || recipeDrink } />
      <Heading recipe={ recipeFood || recipeDrink } />
      <IngredientsRadios recipe={ recipeFood || recipeDrink } />
      <Instructions recipe={ recipeFood || recipeDrink } />
      {recipeDrink ? <Recommends /> : <Recommends drink />}
      <Link to="/receitas-feitas">
        <button
          // disabled
          data-testid="finish-recipe-btn"
          type="button"
          onClick={ () => doneRecipes(recipe) }
        >
          Finalizar Receita
        </button>
      </Link>
    </div>
  );
}

export default ComponentAuxProgress;
