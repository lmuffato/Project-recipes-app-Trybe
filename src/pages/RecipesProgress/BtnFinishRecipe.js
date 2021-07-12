import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
// import { Container } from './styles';

export default function BtnFinishRecipe() {
  const { context } = useContext(AppContext);
  const { checkedState } = context;
  return (
    <Link to="/receitas-feitas">
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled={ checkedState }

      >

        Finalizar Receita

      </button>
    </Link>

  );
}
