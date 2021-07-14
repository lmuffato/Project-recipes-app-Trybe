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
  const { clickSetProgress,
    progressRecipes, initProgressInLS, initDoneRecipesInLS } = useContext(Context);
  function checkAndInitLSProgress() {
    if (!localStorage.getItem('inProgressRecipe')) {
      console.log('Iniciando inProgressRecipe!');
      initProgressInLS();
    }
  }
  function checkAndInitLSDone() {
    if (!localStorage.getItem('doneRecipes')) {
      initDoneRecipesInLS();
    }
  }

  // componentDidUpdate observando idMeal e progressRecipes
  useEffect(() => {
    checkExist(idMeal, progressRecipes); // check exist in context
    checkExistInLS(idMeal, 'meal'); // check exist in LS
  }, [idMeal, progressRecipes]);

  useEffect(() => {
    checkAndInitLSProgress(); // checa se a chave progress no localstorage ja foi iniciada, se nao, inicia.
    checkAndInitLSDone(); // checa se a chave done no ls ja foi iniciada, se nao, inicia.
  });
  return (
    <div className="btn-footer">
      <Link
        to={ `/comidas/${idMeal}/in-progress` }
        id="startBtn"
        className="btn custom"
        data-testid="start-recipe-btn"
        onClick={ () => clickSetProgress('in', idMeal, 'meal', recipe) }
      >
        Default
      </Link>
    </div>
  );
};

ButtonMakeRecipeFood.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default ButtonMakeRecipeFood;
