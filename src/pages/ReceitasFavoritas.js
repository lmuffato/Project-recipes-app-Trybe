import React, { useEffect, useState } from 'react';
import { isNull } from 'lodash';

import Header from '../components/Header';
import FavoriteCard from '../components/FavoriteCard';

function ReceitasFavoritas() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  useEffect(() => {
    setFavoriteRecipes(
      JSON.parse(localStorage.getItem('favoriteRecipes')),
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
      <Header title="Receitas Favoritas" show={ false } />
      <section>
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
      { !isNull(favoriteRecipes)
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
