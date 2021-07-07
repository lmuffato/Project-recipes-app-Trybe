import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../../../context/Context';
import { verifyProgressInLS }
  from '../../../../services/localStorage/setProgressRecipesLS';
// a função abaixo além de verificar a existência altera o texto do botao se a receita ja foi iniciada alguma vez.
const checkExist = (recipeId, progresso) => { // percorre o array de progresso do estado, se encontrar o id retorn o progresso, se não, NULL.
  let found = false;

  progresso.forEach((recipeItem) => {
    if (recipeItem.id === recipeId) {
      document.getElementById('startBtn').innerText = 'Continuar Receita';
      found = true;
    }
  });
  if (found) {
    return true;
  }
  document.getElementById('startBtn').innerText = 'Iniciar Receita';
  return false;
};

const checkExistInLS = (id, type) => {
  if (verifyProgressInLS(id, type)) {
    console.log(`Encontrei o id ${id} no localStorage`);
    document.getElementById('startBtn').innerText = 'Continuar Receita';
  } else {
    console.log(`Não encontrei o id ${id} no localStorage`);
    document.getElementById('startBtn').innerText = 'Iniciar Receita';
  }
};

const ButtonMakeRecipeFood = ({ recipe }) => {
  const { idMeal } = recipe;
  const { clickSetProgress, progressRecipes } = useContext(Context);

  // componentDidUpdate observando idMeal e progressRecipes
  useEffect(() => {
    checkExist(idMeal, progressRecipes); // check exist in context
    checkExistInLS(idMeal, 'meal'); // check exist in LS
  }, [idMeal, progressRecipes]);

  return (
    <Link
      to={ `/comidas/${idMeal}/in-progress` }
      id="startBtn"
      className="startBtn"
      data-testid="start-recipe-btn"
      onClick={ () => clickSetProgress('in', idMeal, 'meal', recipe) }
    >
      Default
    </Link>
  );
};

ButtonMakeRecipeFood.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default ButtonMakeRecipeFood;
