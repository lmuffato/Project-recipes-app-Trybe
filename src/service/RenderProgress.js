import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import contexteRecipe from '../context/ContextRecipes';

function RenderProgress(url, id) {
  const { doneRecipes, inProgressRecipes } = useContext(contexteRecipe);
  const history = useHistory();

  const startRecipe = {
    position: 'fixed',
    bottom: '0px',
  };

  function alreadyDone() {
    let doneFlag = false;
    doneRecipes.forEach((recip) => {
      if (recip.id === id) doneFlag = true;
    });
    return doneFlag;
  }

  function inProgress() {
    let progressFlag = false;
    if (inProgressRecipes.length !== 0) {
      progressFlag = (
        inProgressRecipes.cocktails[id] || inProgressRecipes.meals[id] !== null
      );
    }
    return progressFlag;
  }

  if (alreadyDone()) {
    return (<div>Receita já feita</div>);
  }
  if (inProgress()) {
    return (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ startRecipe }
      >
        Continuar Receita
      </button>
    );
  }
  return (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ startRecipe }
      onClick={ () => history.push(`/${url}/${id}/in-progress`) }
    >
      iniciar receita
    </button>
  );
}

export default RenderProgress;
