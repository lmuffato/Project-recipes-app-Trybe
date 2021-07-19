import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';

import Header from '../../components/Header';

import Card from '../../components/HorizontalFavoriteRecipeCard';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  function filterDoneRecipes(filter) {
    const favoriteRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));

    switch (filter) {
    case 'All': {
      setFavoriteRecipes(favoriteRecipesStorage);
      break;
    }
    case 'Food': {
      setFavoriteRecipes(favoriteRecipesStorage.filter(({ type }) => type === 'comida'));
      break;
    }
    case 'Drink': {
      setFavoriteRecipes(favoriteRecipesStorage.filter(({ type }) => type === 'bebida'));
      break;
    }
    default:
      break;
    }
  }

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(doneRecipesStorage);
  }, []);

  return (
    <>
      <Header title="Receitas Favoritas" hideSearch />
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
        {console.log(favoriteRecipes)}
        {favoriteRecipes.map((recipe, index) => (
          <Card key={ recipe.id } recipe={ recipe } index={ index } />
        ))}
      </div>
    </>
  );
}

export default FavoriteRecipes;
