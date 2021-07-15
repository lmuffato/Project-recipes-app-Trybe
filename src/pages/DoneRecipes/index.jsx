import React from 'react';

import Card from '../../components/HorizontalRecipeCard';

function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  //   const as = [{
  //     id: id - da - receita,
  //     type: comida - ou - bebida,
  //     area: area - da - receita - ou - texto - vazio,
  //     category: categoria - da - receita - ou - texto - vazio,
  //     alcoholicOrNot: alcoholic - ou - non - alcoholic - ou - texto - vazio,
  //     name: nome - da - receita,
  //     image: imagem - da - receita,
  //     doneDate: quando - a - receita - foi - concluida,
  //     tags: array - de - tags - da - receita - ou - array - vazio,
  //   }];

  return (
    <>
      <button type="button" data-testid="filter-by-all-btn">All</button>
      <button type="button" data-testid="filter-by-food-btn">Food</button>
      <button type="button" data-testid="filter-by-drink-btn">Drink</button>
      {doneRecipes.map((recipe, index) => (
        <Card key={ recipe.id } recipe={ recipe } index={ index } />
      ))}
    </>
  );
}

export default DoneRecipes;
