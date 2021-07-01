import React, { useContext } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';
import Footer from '../components/Footer';

function Bebidas() {
  const { APIresponse } = useContext(ReceitasContext);

  if (APIresponse !== undefined) {
    if (APIresponse.drinks !== null) {
      return (
        <div>
          <Header title="Bebidas" />
          <CardList
            list={ APIresponse.drinks }
          />
          <Footer />
        </div>
      );
    }
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (
      <div>
        <Header title="Bebidas" />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Header title="Bebidas" displayButton />
      <Footer />
    </div>
  );
}

export default Bebidas;
