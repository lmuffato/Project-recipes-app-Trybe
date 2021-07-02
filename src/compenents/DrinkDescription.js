import React, { useContext } from 'react';
import SearchbarContext from '../contexts/SearchbarContext';

function DrinkDescription() {
  const { recipes } = useContext(SearchbarContext);

  console.log(recipes);

  return (
    <div>
      <p>Descrição comida! Deu certo</p>
    </div>
  );
}

export default DrinkDescription;
