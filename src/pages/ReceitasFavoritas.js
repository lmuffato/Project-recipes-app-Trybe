import React, { useContext, useState } from 'react';

import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';
import storageContext from '../context/StorageContext';

function ReceitasFavoritas() {
  const { favoriteRecipes } = useContext(storageContext);
  const [selectedCategory, setSelectedCategory] = useState('todos');

  function changeSelectedCategory({ target: { name } }) {
    setSelectedCategory(name);
  }
  function byCategory(recipe) {
    if (selectedCategory === 'todos') return true;
    return recipe.type === selectedCategory;
  }
  return (
    <section>
      <Header title="Receitas Favoritas" show={ false } />
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
      { favoriteRecipes
      && favoriteRecipes
        .filter(byCategory)
        .map((recipe, index) => (
          <FavoriteCard
            index={ index }
            key={ `${recipe.type}-${recipe.id}` }
            { ...recipe }
          />
        )) }
    </section>
  );
}

export default ReceitasFavoritas;
