import React, { useContext } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';

function Comidas() {
  const { APIresponse } = useContext(ReceitasContext);

  if (APIresponse !== undefined) {
    if (APIresponse.meals !== null && APIresponse.meals.length >= 1) {
      return (
        <div>
          <Header title="Comidas" />
          <CardList
            list={ APIresponse.meals }
          />
        </div>
      );
    }
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (
      <Header title="Comidas" />
    );
  }
  return (
    <div>
      <Header title="Comidas" />
    </div>
  );
}

export default Comidas;
