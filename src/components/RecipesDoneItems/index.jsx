import React, { useState, useEffect } from 'react';
import RecipesDoneCard from '../RecipesDoneCard';

export default function RecipesDoneItems() {
  const [recipesDone, setRecipes] = useState([]);
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const getItems = () => {
      const recipes = JSON.parse(localStorage.getItem('doneRecipes'));
      if (recipes !== null) {
        setRecipes(recipes);
      }
    };
    getItems();
  }, []);
  const renderRecipes = () => {
    const filtered = recipesDone.filter(({ type }) => type
      .toLowerCase().includes(filter.toLowerCase()));
    return (
      <div>
        {filtered.map((recipe, index) => (
          <RecipesDoneCard key={ index } recipe={ recipe } index={ index } />
        ))}
      </div>
    );
  };
  const handleButtons = ({ target: { value } }) => {
    setFilter(value);
  };
  return (
    <div>
      <div>
        <button
          onClick={ handleButtons }
          data-testid="filter-by-all-btn"
          value=""
          type="button"
        >
          All
        </button>
        <button
          onClick={ handleButtons }
          data-testid="filter-by-food-btn"
          value="comida"
          type="button"
        >
          Food
        </button>
        <button
          onClick={ handleButtons }
          data-testid="filter-by-drink-btn"
          value="bebida"
          type="button"
        >
          Drinks
        </button>
      </div>
      { renderRecipes() }
    </div>
  );
}
