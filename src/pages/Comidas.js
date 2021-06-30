import React, { useContext, useEffect } from 'react';
import CardList from '../components/CardList';
import Header from '../components/Header';
import ReceitasContext from '../contexts/ReceitasContext';
import Footer from '../components/Footer';

function Comidas() {
  const { APIresponse, fetchApi } = useContext(ReceitasContext);

  useEffect(() => {
    fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <Header title="Comidas" />
      <Footer />
    </div>
  );
}

export default Comidas;
