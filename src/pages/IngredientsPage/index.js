import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ExploreIngredients from '../../components/ExploreIngredients';

export default function IngredientsPage() {
  return (
    <div>
      <Header title="Explorar Ingredientes" />
      <ExploreIngredients />
      <Footer />
    </div>
  );
}
