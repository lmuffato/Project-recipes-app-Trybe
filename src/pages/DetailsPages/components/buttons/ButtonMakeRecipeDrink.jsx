import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Context from '../../../../context/Context';
// import { verifyInLS } from '../../../../services/localStorage/setFavRecipes';
import { verifyProgressInLS }
  from '../../../../services/localStorage/setProgressRecipesLS';
import { verifyDoneRecipesInLS } from '../../../../services/localStorage/doneRecipes';
// a função abaixo além de verificar a existência altera o texto do botao se a receita ja foi iniciada alguma vez.
export const checkExist = (recipeId, progresso) => { // percorre o array de progresso do estado, se encontrar o id retorn o progresso, se não, NULL.
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

function checkExistInLS(id, type) {
  if (verifyProgressInLS(id, type)) {
    document.getElementById('startBtn').innerText = 'Continuar Receita';
  } else {
    document.getElementById('startBtn').innerText = 'Iniciar Receita';
  }
}

function checkDoneInLS(id) {
  if (verifyDoneRecipesInLS(id)) {
    document.getElementById('startBtn').style.display = 'none';
  }
}

const ButtonMakeRecipeDrink = ({ recipe }) => {
  const { idDrink } = recipe;
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
  // componentDidMount
  useEffect(() => {
    checkExist(idDrink, progressRecipes); // verifica no context
    checkExistInLS(idDrink, 'drink'); // verifica no LS
    checkDoneInLS(idDrink); // verifica se o idDrink está no LS.
  }, [idDrink, progressRecipes]);

  useEffect(() => {
    checkAndInitLSProgress(); // checa chave no local storage (progress)
    checkAndInitLSDone(); // checa chave no local storage (done)
  });

  return (
    <div className="btn-footer">
      <Link
        to={ `/bebidas/${idDrink}/in-progress` }
        id="startBtn"
        className="btn custom"
        data-testid="start-recipe-btn"
        onClick={ () => clickSetProgress('in', idDrink, 'drink', recipe) }
      >
        Default
      </Link>
    </div>
  );
};

ButtonMakeRecipeDrink.propTypes = {
  recipe: PropTypes.object,
}.isRequired;

export default ButtonMakeRecipeDrink;
