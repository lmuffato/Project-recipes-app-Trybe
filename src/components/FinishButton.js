import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useRouteMatch } from 'react-router-dom';
import requestData from '../services/getFinishData';

function FinishButton({ isDisable, path }) {
  const history = useHistory();
  const match = useRouteMatch();

  const handleClick = async () => {
    const { params: { id } } = match;
    await requestData(id, path);
    history.push('/receitas-feitas');
  };

  return (
    <div className="button-container">
      <button
        className="start-button"
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ () => handleClick() }
        disabled={ isDisable }
      >
        Finalizar receita
      </button>
    </div>
  );
}

FinishButton.propTypes = {
  isDisable: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

export default FinishButton;
