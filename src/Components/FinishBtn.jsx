import React from 'react';

const FinishBtn = () => {
  const handleClick = () => alert('oi');
  return (
    <button
      data-testid="finish-recipe-btn"
      type="button"
      onClick={ handleClick }
    >
      Finalizar
    </button>
  );
};

export default FinishBtn;
