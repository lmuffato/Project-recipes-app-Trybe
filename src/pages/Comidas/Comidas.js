import React, { useContext, useEffect } from 'react';

import CardList from '../../components/CardList';
import Header from '../../components/Header';
import ReceitasContext from '../../contexts/ReceitasContext';
import Footer from '../../components/Footer';
import Filter from '../../components/Filter';

function Comidas() {
  const { APIFood,
    fetchApi,
    explore,
  } = useContext(ReceitasContext);

  useEffect(() => {
    if (explore === false) {
      fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'comidas');
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (APIFood !== undefined) {
    if (APIFood.meals !== null && APIFood.meals.length >= 1) {
      return (
        <div>
          <Header title="Comidas" />
          <Filter page="comidas" />
          <CardList
            list={ APIFood.meals }
            type="comidas"
          />
          <Footer />
        </div>
      );
    }
    // eslint-disable-next-line no-alert
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
      <Filter page="comidas" />
      <Footer />
    </div>
  );
}

export default Comidas;
