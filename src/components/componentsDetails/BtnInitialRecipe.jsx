import React from 'react';

export default function BtnInitialRecipe() {
  const btnInitialRec = (
    <button type="button" data-testid="start-recipe-btn" className="playRecipe">
      Iniciar Receita
    </button>
  );
  return (
    <div>
      { btnInitialRec }
    </div>
  );
}
