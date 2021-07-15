import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';

import Card from '../../components/HorizontalRecipeCard';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  function filterDoneRecipes(filter) {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));

    switch (filter) {
    case 'All': {
      setDoneRecipes(doneRecipesStorage);
      break;
    }
    case 'Food': {
      setDoneRecipes(doneRecipesStorage.filter(({ type }) => type === 'comida'));
      break;
    }
    case 'Drink': {
      setDoneRecipes(doneRecipesStorage.filter(({ type }) => type === 'bebida'));
      break;
    }
    default:
      break;
    }
  }

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesStorage);
  }, []);

  return (
    <>
      <Header title="Receitas Feitas" hideSearch />
      <div className={ styles.page }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ ({ target }) => filterDoneRecipes(target.innerText) }
        >
          All

        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ ({ target }) => filterDoneRecipes(target.innerText) }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ ({ target }) => filterDoneRecipes(target.innerText) }
        >
          Drink
        </button>
        {doneRecipes.map((recipe, index) => (
          <Card key={ recipe.id } recipe={ recipe } index={ index } />
        ))}
      </div>
    </>
  );
}

export default DoneRecipes;
