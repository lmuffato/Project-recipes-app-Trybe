import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from '../../context/Context';
import doneRecipes from '../../services/localStorage/doneRecipes';
import {
  Image,
  Heading,
  IngredientsRadios,
  Instructions,
  Recommends,
} from './components/index';

function ComponentAuxProgress(recipe) {
  const { setDoneRecipes, setInfoDone } = useContext(Context);
  const { recipeFood, recipeDrink } = recipe;
  const handleClick = () => {
    doneRecipes(recipe);
    const infoDone = JSON.parse(localStorage.getItem('doneRecipes'));
    if (infoDone !== true) {
      setDoneRecipes(infoDone);
      setInfoDone(infoDone);
    }
    // const doneRecipesConst = JSON.parse(localStorage.getItem('doneRecipes'));
    // console.log(doneRecipesConst);
  };
  return (
    <>
      <Image recipe={ recipeFood || recipeDrink } />
      <Heading recipe={ recipeFood || recipeDrink } />
      <div className="container">
        <IngredientsRadios recipe={ recipeFood || recipeDrink } />
        <Instructions recipe={ recipeFood || recipeDrink } />
        {recipeDrink ? <Recommends /> : <Recommends drink />}
      </div>
      <div className="btn-footer">
        <Link to="/receitas-feitas">
          <button
            data-testid="finish-recipe-btn"
            type="button"
            onClick={ () => handleClick() }
            className="btn made"
          >
            Finalizar Receita
          </button>
        </Link>
      </div>
    </>
  );
}

export default ComponentAuxProgress;
