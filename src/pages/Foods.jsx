import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import useMainRecipe from '../hooks/useMainRecipe';

export default function Foods() {
  const { renderCards } = useMainRecipe('meal');

  return (
    <main>
      <Header title="Comidas" searchIcon />
      <div>{renderCards()}</div>
      <Footer />
    </main>
  );
}
