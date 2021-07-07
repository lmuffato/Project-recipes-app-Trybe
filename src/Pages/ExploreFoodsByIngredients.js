import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchFoodIngredients from '../helpers/fetchFoodIngredients';
import RenderIngredients from '../util/renderFoodIngredients';

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const { meals } = await fetchFoodIngredients();
      setIngredients(meals);
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
