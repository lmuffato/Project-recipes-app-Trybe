import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams, useHistory } from 'react-router-dom';
import { handleCheckLS, handleCheckDoneRecipes } from '../../helpers/localStorageHelper';
import Button from '../Generics/Button';

function InitOrContinueButton({ type }) {
  const [isRecipeInProgress, setRecipeInProgress] = useState(false);
  const [hasRecipeBeenDone, setDoneRecipe] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    const checkId = handleCheckLS('inProgressRecipes', id, type);
    if (checkId) return setRecipeInProgress(true);
    const checkDoneRecipe = handleCheckDoneRecipes('doneRecipes', id);
    if (checkDoneRecipe) return setDoneRecipe(true);
    return () => {
      cancel = true;
    };
  }, [id, type]);

  const handleClick = (ev) => {
    ev.preventDefault();
    history.push(`${id}/in-progress`);
  };

  if (hasRecipeBeenDone) {
    return '';
  }

  return (

    <Button
      data-testid="start-recipe-btn"
      className="recipe-btn"
      onClick={ (ev) => handleClick(ev) }
    >
      { isRecipeInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </Button>
  );
}

InitOrContinueButton.propTypes = {
  type: PropTypes.string.isRequired,
};

export default InitOrContinueButton;
