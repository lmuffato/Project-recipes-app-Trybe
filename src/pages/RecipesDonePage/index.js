import React from 'react';
import Header from '../../components/Header';
import RecipesDoneItems from '../../components/RecipesDoneItems';

export default function RecipesDonePage() {
  return (
    <div>
      <Header title="Receitas Feitas" />
      <RecipesDoneItems />
    </div>
  );
}
