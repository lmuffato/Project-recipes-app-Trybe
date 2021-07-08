import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../../store/Context';

function DrinkInProgress() {
  const { inProgressRecipes } = useContext(context);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  return (
    <div>
      <Link to="/bebidas">Voltar</Link>
      Receita em progresso
    </div>
  );
}

export default DrinkInProgress;
