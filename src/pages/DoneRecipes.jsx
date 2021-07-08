import React, { useState, useEffect } from 'react';
import DoneRecipeCard from '../components/DoneRecipeCard/DoneRecipeCard';
import filterRecipesByType from '../utils/filterRecipesByType';
import Header from '../components/Header/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filterByType, setFilterByType] = useState('All');
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  useEffect(() => {
    const doneStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneStorage) setDoneRecipes(doneStorage);
  }, []);

  function handleRemoveRecipe(index) {
    const updatedDoneRecipes = doneRecipes
      .slice(0, index)
      .concat(doneRecipes.slice(index + 1));

    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
    setDoneRecipes(updatedDoneRecipes);
  }

  if (doneRecipes.length === 0) {
    return (
      <div>
        <Header>
          <h1 data-testid="page-title">Receitas Feitas</h1>
        </Header>
        <h2>Você não possui receitas feitas!</h2>
      </div>
    );
  }

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Receitas Feitas</h1>
      </Header>
      { copiedToClipboard && 'Link copiado!' }
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilterByType('All') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilterByType('Food') }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilterByType('Drinks') }
        >
          Drinks
        </button>
      </div>
      { filterRecipesByType(doneRecipes, filterByType).map((recipe, index) => (
        <DoneRecipeCard
          recipe={ recipe }
          index={ index }
          key={ index }
          handleRemoveRecipe={ handleRemoveRecipe }
          setCopiedToClipboard={ setCopiedToClipboard }
        />
      )) }
    </div>
  );
}

export default DoneRecipes;
