import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import fetchFoodIngredients from '../helpers/fetchFoodIngredients';

// const renderIngredients = () => {
//   return (
//     <h1>Funfou</h1>
//   );
// };

export default function ExploreFoodsByIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const getIngredients = async () => {
      const { meals } = await fetchFoodIngredients();
      setIngredients(meals);
    };
    getIngredients();
  }, []);
  console.log(ingredients);
  return (
    <>
      <Header props={ { search: false, title: 'Explorar Ingredientes' } } />
      {/* {renderIngredients()} */}
      <Footer />
    </>
  );
}
