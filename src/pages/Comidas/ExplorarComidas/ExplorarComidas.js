import React, { useState, useEffect } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import FilterFood from '../../../components/ExploreComponents/filterFood';

function ExplorarComidas() {
  const [random, setRandom] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function randomSearch() {
      const requisition = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      const data = await requisition.json();
      const { idMeal } = data.meals[0];
      const randomPath = `/comidas/${idMeal}`;
      setRandom(randomPath);
      setLoading(false);
    }
    randomSearch();
  }, []);

  const address = {
    ingredients: '/explorar/comidas/ingredientes',
    area: '/explorar/comidas/area',
    random,
  };

  return (
    <>
      <Header title="Explorar Comidas" displayButton={ false } />
      {loading === false && <FilterFood address={ address } />}
      <Footer />
    </>
  );
}

export default ExplorarComidas;
