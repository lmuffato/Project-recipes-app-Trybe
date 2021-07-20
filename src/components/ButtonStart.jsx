import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import checkInProgressId from '../service/checkInProgressId';
import checkRecipeIsDone from '../service/checkRecipeIsDone';
import '../styleSheets/ButtonStartFinish.css';

function ButtonStart(props) {
  const { type, id } = props;
  const dbType = type.includes('comidas') ? 'meals' : 'cocktails';
  const isInProgress = id === checkInProgressId(dbType);
  const history = useHistory();
  const buttonStart = (
    <button
      type="button"
      data-testid="start-recipe-btn"
      className="button-start"
      onClick={ () => history.push(`/${type}/${id}/in-progress`) }
    >
      { isInProgress ? 'Continuar Receita' : 'Iniciar Receita' }
    </button>
  );

  return (
    <div
      className="container-button"
    >
      {checkRecipeIsDone(id)
        ? <p className="done-message">Receita já foi feita!</p>
        : buttonStart}
    </div>

  );
}

ButtonStart.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default ButtonStart;
