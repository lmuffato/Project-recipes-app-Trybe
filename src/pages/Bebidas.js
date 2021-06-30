import React, { useContext } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';

function Bebidas() {
  const { APIresponse } = useContext(ReceitasContext);
  return (
    <div>
      <Header title="Bebidas" />
      { APIresponse !== undefined
        && <CardList
          list={ APIresponse.drinks }
        />}
    </div>
  );
}

export default Bebidas;
