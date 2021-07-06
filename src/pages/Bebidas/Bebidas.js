import React, { useContext, useEffect } from 'react';
import CardList from '../../components/CardList';
import Header from '../../components/Header';
import ReceitasContext from '../../contexts/ReceitasContext';
import Footer from '../../components/Footer';
import Filter from '../../components/Filter';

function Bebidas() {
  const { APIDrink,
    fetchApi,
    explore,
  } = useContext(ReceitasContext);

  useEffect(() => {
    if (explore === false) {
      fetchApi('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=', 'bebidas');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (APIDrink !== undefined) {
    if (APIDrink.drinks !== null && APIDrink.drinks.length >= 1) {
      return (
        <div>
          <Header title="Bebidas" />
          <Filter page="bebidas" />
          <CardList
            list={ APIDrink.drinks }
            type="bebidas"
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
