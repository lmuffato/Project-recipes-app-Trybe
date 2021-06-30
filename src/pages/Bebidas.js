import React, { useContext, useEffect } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';
import Footer from '../components/Footer';
import Filter from '../components/Filter';

function Bebidas() {
  const { APIresponse, fetchApi } = useContext(ReceitasContext);

  useEffect(() => {
    fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (APIresponse !== undefined) {
    if (APIresponse.drinks !== null) {
      return (
        <div>
          <Header title="Bebidas" />
          <Filter page="bebidas" />
          <CardList
            list={ APIresponse.drinks }
          />
          <Footer />
        </div>
      );
    }
    // eslint-disable-next-line no-alert
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
      <Header title="Bebidas" />
      <Filter page="bebidas" />
      <Footer />
    </div>
  );
}

export default Bebidas;
