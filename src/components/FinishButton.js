import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function FinishButton({ isDisable }) {
  const history = useHistory();

  const handleClick = () => {
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
};

export default FinishButton;
