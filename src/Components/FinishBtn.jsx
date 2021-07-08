import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

const FinishBtn = ({ checksDone }) => {
  const history = useHistory();
  const handleClick = () => {
    history.push('/receitas-feitas');
  };
  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ handleClick }
      disabled={ checksDone !== document.querySelectorAll('label').length }
    >
      Finalizar
    </button>
  );
};

FinishBtn.propTypes = {
  checksDone: PropTypes.number.isRequired,
}.isRequired;

export default FinishBtn;
