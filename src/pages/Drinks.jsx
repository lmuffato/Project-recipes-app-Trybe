import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipe from '../hooks/useMainRecipe';

export default function Drinks() {
  const { renderCards } = useMainRecipe('drinks', 'drink');

  return (
    <main>
      <Header title="Bebidas" searchIcon />
      <div>{renderCards()}</div>
      <Footer />
    </main>
  );
}
