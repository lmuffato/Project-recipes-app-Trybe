import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from '../contexts/SearchbarContext';
import DrinkCards from './DrinkCards';
import MealCards from './MealCards';
import RecipesContext from '../contexts/RecipesContext';
import FilterButtons from './FilterButtons';
import SearchBar from './SearchBar';
import '../App.css';
import '../styles/MainRecipes.css';
import Loading from './Loading';

function MainRecipes() {
  const [renderRecipes, setRenderRecipes] = useState([]);
  const { searchBtn } = useContext(SearchbarContext);
  const {
    type, recipes, searchedRecipes, mealsAndDrinkByIngredients,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (recipes && !searchBtn) setRenderRecipes(recipes);
    if (mealsAndDrinkByIngredients) setRenderRecipes(mealsAndDrinkByIngredients);
    if (searchedRecipes && searchBtn) setRenderRecipes(searchedRecipes);
  }, [recipes, mealsAndDrinkByIngredients, searchedRecipes, searchBtn]);

  if (renderRecipes) {
    return (
      <>
        { searchBtn ? <SearchBar /> : <FilterButtons /> }
        <section className="recipes-container">
          { type === 'meal'
            ? <MealCards data={ renderRecipes } />
            : <DrinkCards data={ renderRecipes } />}
        </section>
      </>
    );
  }
  return (
    <Loading />
  );
}

MainRecipes.propTypes = {
  categories: PropTypes.array,
  recipes: PropTypes.array,
  handleFilter: PropTypes.func,
}.isRequired;

export default MainRecipes;
