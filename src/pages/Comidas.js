import React, { useContext } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';

function Comidas() {
  const { APIresponse } = useContext(ReceitasContext);
  return (
    <div>
      <Header title="Comidas" />
      { APIresponse !== undefined
          && <CardList
            list={ APIresponse.meals }
          />}
    </div>
  );
}

export default Comidas;
