import React, { useEffect, useState } from 'react';
import { isUndefined } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';

import '../../styles/recipe.css';

function Start() {
  const [isDone, setIsDone] = useState(false);
  const [alreadyStarted, setAlreadyStarted] = useState(false);
  const { id } = useParams();
  const { push } = useHistory();
  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setIsDone(doneRecipes && doneRecipes
      .some((recipe) => Number(recipe.id) === Number(id)));
  }, [id]);
  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setAlreadyStarted(inProgressRecipes && !isUndefined(inProgressRecipes.meals[id]));
  }, [id]);

  const visibility = isDone ? 'recipe-start-button-hidden'
    : 'recipe-start-button-show';
  return (
    <button
      type="button"
      className={ `recipe-start-button ${visibility}` }
      data-testid="start-recipe-btn"
      onClick={ () => push(`/comidas/${id}/in-progress`) }
    >
      {alreadyStarted ? 'Continuar Receita' : 'Iniciar receita'}
    </button>
  );
}

export default Start;
