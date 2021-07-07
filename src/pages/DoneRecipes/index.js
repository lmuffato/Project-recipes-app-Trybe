import React, { useEffect, useState } from 'react';
import Header from '../../components/Header';
import DoneRecipeCard from '../../components/DoneRecipeCard';

export default function DoneRecipes() {
  // mock localstorage start
  // const receitasFeitas = [
  //   {
  //     id: '52771',
  //     type: 'comida',
  //     area: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //     doneDate: '23/06/2020',
  //     tags: ['Pasta', 'Curry'],
  //   },
  //   {
  //     id: '178319',
  //     type: 'bebida',
  //     area: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //     doneDate: '23/06/2020',
  //     tags: [],
  //   },
  // ];
  // localStorage.setItem('doneRecipes', JSON.stringify(receitasFeitas));
  // mock localstorage end
  document.title = 'Receitas Feitas';
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(allRecipes);
    setFilter(allRecipes);
  }, []);
  function filterFavoriteRecipes(filterName) {
    const filterRecipeType = doneRecipes.filter((recipe) => recipe.type === filterName);
    const allRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (filterName === '') {
      setFilter(allRecipes);
    } else {
      setFilter(filterRecipeType);
    }
  }
  return (
    <div>
      <Header />
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => filterFavoriteRecipes('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFavoriteRecipes('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterFavoriteRecipes('bebida') }
      >
        Drinks
      </button>
      { filter.map((recipe, index) => (
        <DoneRecipeCard key={ recipe.id } recipe={ recipe } index={ index } />
      )) }
    </div>
  );
}
