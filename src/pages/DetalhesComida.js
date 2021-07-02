import React from 'react';
import DetalheReceita from '../components/DetalheReceitaComida';

import mockMeals from '../components/mock/mockMeals';

function DetalhesComida() {
  return (
    <div>
      <h1>DetalhesComida</h1>
      <DetalheReceita props={ mockMeals } />
    </div>
  );
}

export default DetalhesComida;
