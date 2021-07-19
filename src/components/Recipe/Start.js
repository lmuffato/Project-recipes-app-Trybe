import React, { useEffect, useState } from 'react';
import { isUndefined } from 'lodash';
import { useHistory, useParams } from 'react-router-dom';

import '../../styles/recipe.css';
import { string } from 'prop-types';

function Start({ type }) {
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
    if (type === 'comidas') {
      setAlreadyStarted(inProgressRecipes && !isUndefined(inProgressRecipes.meals[id]));
    } else {
      setAlreadyStarted(
        inProgressRecipes && !isUndefined(inProgressRecipes.cocktails[id]),
      );
    }
  }, [type, id]);

  const visibility = isDone ? 'recipe-start-button-hidden'
    : 'recipe-start-button-show';
  return (
    <button
      type="button"
      className={ `recipe-start-button ${visibility} btn-finalizar` }
      data-testid="start-recipe-btn"
      onClick={ () => push(`/${type}/${id}/in-progress`) }
    >
      {alreadyStarted ? 'Continuar Receita' : 'Iniciar receita'}
    </button>
  );
}

Start.propTypes = {
  type: string.isRequired,
};

export default Start;
