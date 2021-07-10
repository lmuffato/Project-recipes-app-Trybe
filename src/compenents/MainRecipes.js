import React, { useContext } from 'react';
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
  const { searchBtn } = useContext(SearchbarContext);
  const { type, recipes, searchedRecipes } = useContext(RecipesContext);

  let renderRecipes;

  if (searchedRecipes) {
    renderRecipes = searchedRecipes;
  } else {
    renderRecipes = recipes;
  }

  return (
    <main data-testid="main-recipes" className="main">
      { searchBtn ? <SearchBar /> : <FilterButtons /> }
      <section className="recipes-container">
        { type === 'meal' ? renderRecipes.map((recipe, index) => (
          <MealCards
            data={ recipe }
            index={ index }
            linkTestid={ `${index}-recipe-card` }
            titleTestid={ `${index}-card-name` }
            key={ recipe.idMeal }
          />
        )) : renderRecipes.map((recipe, index) => (
          <DrinkCards
            data={ recipe }
            index={ index }
            testId={ `${index}-recipe-card` }
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
