import React, { useContext } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';
import Footer from '../components/Footer';

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
          <Footer />
        </div>
      );
    }
    alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return (
      <div>
        <Header title="Comidas" />
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <Header title="Comidas" displayButton />
      <Footer />
    </div>
  );
}

export default Comidas;
