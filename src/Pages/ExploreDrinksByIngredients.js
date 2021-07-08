import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchDrinkIngredients from '../helpers/fetchDrinkIngredients';
import RenderIngredients from '../util/renderDrinkIngredients';

export default function ExploreDrinksByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const { drinks } = await fetchDrinkIngredients();
      setIngredients(drinks);
    };
    getIngredients();
  }, []);
  return (
    <>
      <Header props={ { search: false, title: 'Explorar Ingredientes' } } />
      {RenderIngredients(ingredients)}
      <Footer />
    </>
  );
}
