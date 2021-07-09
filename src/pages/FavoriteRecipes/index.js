import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import RecipeContext from '../../context/RecipeContext';
import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';

export default function FavoriteRecipes() {
  // mock localstorage start
  // const receitasFavoritas = [
  //   {
  //     id: '52771',
  //     type: 'comida',
  //     area: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  //   {
  //     id: '178319',
  //     type: 'bebida',
  //     area: '',
  //     category: 'Cocktail',
  //     alcoholicOrNot: 'Alcoholic',
  //     name: 'Aquamarine',
  //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  //   },
  // ];
  // localStorage.setItem('favoriteRecipes', JSON.stringify(receitasFavoritas));
  // mock localstorage end
  document.title = 'Receitas Favoritas';
  // const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const { favoriteRecipes, setFavoriteRecipes } = useContext(RecipeContext);
  const [filter, setFilter] = useState([]);
  useEffect(() => {
    const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipes(allRecipes);
    setFilter(allRecipes);
  }, [setFavoriteRecipes]);

  function filterFavoriteRecipesType(filterName) {
    const filterRecipeType = favoriteRecipes
      .filter((recipe) => recipe.type === filterName);
    const allRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
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
        onClick={ () => filterFavoriteRecipesType('') }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => filterFavoriteRecipesType('comida') }
      >
        Food
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => filterFavoriteRecipesType('bebida') }
      >
        Drinks
      </button>
      { filter.map((recipe, index) => (
        <FavoriteRecipeCard
          key={ recipe.id }
          recipe={ recipe }
          index={ index }
        />
      )) }
    </div>
  );
}
