import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
// import { Container } from './styles';

export default function BtnFinishRecipe() {
  const { context } = useContext(AppContext);
  const { checkedState, toDoneStorage } = context;
  const key = 'doneRecipes';

  function setDoneStorage() {
    localStorage.setItem(key, JSON.stringify(toDoneStorage));
  }
  return (
    <Link to="/receitas-feitas">
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ checkedState }
        onClick={ setDoneStorage }

      >

        Finalizar Receita

      </button>
    </Link>

  );
}
