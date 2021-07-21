import React, { useEffect, useState } from 'react';
import DoneRecipeCard from '../components/DoneRecipes/DoneRecipeCard';

import Header from '../components/Header';

function ReceitasFeitas() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  useEffect(() => {
    setDoneRecipes(
      JSON.parse(localStorage.getItem('doneRecipes')),
    );
  }, []);

  function changeSelectedCategory({ target: { name } }) {
    setSelectedCategory(name);
  }
  function byCategory(recipe) {
    if (selectedCategory === 'todos') return true;
    return recipe.type === selectedCategory;
  }

  return (
    <section>
      <Header title="Receitas Feitas" show={ false } />
      <section className="category-buttons">
        <button
          data-testid="filter-by-all-btn"
          type="button"
          name="todos"
          onClick={ changeSelectedCategory }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          name="comida"
          onClick={ changeSelectedCategory }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          name="bebida"
          onClick={ changeSelectedCategory }
        >
          Drinks
        </button>
      </section>
      { doneRecipes
    && doneRecipes
      .filter(byCategory)
      .map((recipe, index) => (
        <DoneRecipeCard
          index={ index }
          key={ `${recipe.type}-${recipe.id}` }
          { ...recipe }
        />
      )) }
    </section>
  );
}

export default ReceitasFeitas;
