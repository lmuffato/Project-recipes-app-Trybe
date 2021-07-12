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

function MainRecipes() {
  const [renderRecipes, setRenderRecipes] = useState([]);
  const { searchBtn } = useContext(SearchbarContext);
  const {
    type, recipes, searchedRecipes, mealsAndDrinkByIngredients,
  } = useContext(RecipesContext);

  useEffect(() => {
    if (recipes) setRenderRecipes(recipes);
    if (mealsAndDrinkByIngredients) setRenderRecipes(mealsAndDrinkByIngredients);
    if (searchedRecipes) setRenderRecipes(searchedRecipes);
  }, [recipes, mealsAndDrinkByIngredients, searchedRecipes]);

  console.log(mealsAndDrinkByIngredients);

  return (
    <main data-testid="main-recipes" className="main">
      { searchBtn ? <SearchBar /> : <FilterButtons /> }
      <section className="recipes-container">
        { type === 'meal' ? renderRecipes.map((recipe, index) => (
          <MealCards
            data={ recipe }
            index={ index }
            key={ recipe.idMeal }
            // data-testid={ `${index}-ingredient-card` }
          />
        )) : renderRecipes.map((recipe, index) => (
          <DrinkCards
            data={ recipe }
            index={ index }
            key={ recipe.idDrink }
          />
        ))}
      </section>
    </main>
  );
}

MainRecipes.propTypes = {
  categories: PropTypes.array,
  recipes: PropTypes.array,
  handleFilter: PropTypes.func,
}.isRequired;

export default MainRecipes;
