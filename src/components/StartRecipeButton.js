import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

export default function StartRecipeButton() {
  const history = useHistory();
  const location = useLocation();
  const url = location.pathname;
  return (
    <div className="button-container">
      <button
        className="start-button"
        onClick={ () => history.push(`${url}/in-progress`) }
        data-testid="start-recipe-btn"
        type="button"
      >
        Iniciar Receita
      </button>
    </div>
  );
}
