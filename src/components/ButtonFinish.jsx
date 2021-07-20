import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import setDoneRecipesLocalStorage from '../service/setDoneRecipeLocalStorage';
import '../styleSheets/ButtonStartFinish.css';

function ButtonFinish(props) {
  const { completed, dbType, id } = props;
  const history = useHistory();
  const finishRecipe = async () => {
    await setDoneRecipesLocalStorage(dbType, id);
    localStorage.removeItem('inProgressRecipes');
    history.push('/receitas-feitas');
  };

  return (
    <button
      type="button"
      data-testid="finish-recipe-btn"
      className="container-button"
      onClick={ () => finishRecipe() }
      disabled={ !completed }

    >
      Finalizar Receita
    </button>
  );
}

ButtonFinish.propTypes = {
  completed: PropTypes.bool.isRequired,
  dbType: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonFinish;
