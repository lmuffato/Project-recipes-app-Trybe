import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../../store/Context';

function FoodInProgress() {
  const { inProgressRecipes } = useContext(context);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));
  }, [inProgressRecipes]);

  return (
    <div>
      <Link to="/comidas">Voltar</Link>
      Receita em progresso
    </div>
  );
}

export default FoodInProgress;
