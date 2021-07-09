import React, { useContext, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ReceitasContext from '../../../contexts/ReceitasContext';
import CardList from '../../../components/CardList';
import AreasDropdown from '../../../components/ExploreComponents/AreasDropdown';

function ExplorarBebidasPorArea() {
  const { fetchApi, APIFood } = useContext(ReceitasContext);
  useEffect(() => {
    fetchApi('https://www.themealdb.com/api/json/v1/1/search.php?s=', 'comidas');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (APIFood !== undefined) {
    if (APIFood.meals !== null && APIFood.meals.length >= 1) {
      return (
        <div>
          <Header title="Explorar Origem" />
          <AreasDropdown />
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
      <Header title="Explorar Origem" />
      <AreasDropdown />
      <Footer />
    </div>
  );
}

export default ExplorarBebidasPorArea;
