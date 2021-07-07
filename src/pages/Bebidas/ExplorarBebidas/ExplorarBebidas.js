import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FilterDrinks from '../../../components/ExploreComponents/filterDrinks';

function ExplorarBebidas() {
  const [random, setRandom] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function randomSearch() {
      const requisition = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const data = await requisition.json();
      const { idDrink } = data.drinks[0];
      const randomPath = `/bebidas/${idDrink}`;
      setRandom(randomPath);
      setLoading(false);
    }
    randomSearch();
  }, []);

  const address = {
    ingredients: '/explorar/bebidas/ingredientes',
    area: '',
    random,
  };

  return (
    <>
      <Header title="Explorar Bebidas" displayButton={ false } />
      {loading === false
      && <FilterDrinks address={ address } />}
      <Footer />
    </>
  );
}

export default ExplorarBebidas;
