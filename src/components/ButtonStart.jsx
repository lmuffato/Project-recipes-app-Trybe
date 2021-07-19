import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipes from '../context/ContextRecipes';
import checkRecipeIsDone from '../service/checkRecipeIsDone';
import '../styleSheets/ButtonStartFinish.css';

function ButtonStart(props) {
  const { type, id } = props;
  const { inProgressId } = useContext(ContextRecipes);
  const history = useHistory();
  const buttonStart = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="button-start"
      onClick={ () => history.push(`/${type}/${id}/in-progress`) }
    >
      { inProgressId === id ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );

  return (
    <div
      className="container-button"
    >
      {checkRecipeIsDone(id)
        ? <p className="button-start">Receita já foi feita!</p>
        : buttonStart}
    </div>

  );
}

ButtonStart.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonStart;
