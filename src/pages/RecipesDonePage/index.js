import React from 'react';
import Header from '../../components/Header';
import RecipesDoneItems from '../../components/RecipesDoneItems';
import Footer from '../../components/Footer';

export default function RecipesDonePage() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <RecipesDoneItems />
      <Footer />
    </div>
  );
}
