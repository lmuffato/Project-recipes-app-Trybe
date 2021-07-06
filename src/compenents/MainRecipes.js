import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import SearchbarContext from '../contexts/SearchbarContext';
import DrinkCards from './DrinkCards';
import MealCards from './MealCards';
import RecipesContext from '../contexts/RecipesContext';

function MainRecipes({ categories, recipes, handleFilter }) {
  const { setSearchCategory } = useContext(SearchbarContext);
  const { type } = useContext(RecipesContext);

  return (
    <>
      <section>
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setSearchCategory('list') }
        >
          All
        </button>
        {categories.map(({ strCategory }, index) => (
          <button
            key={ index }
            type="button"
            value={ strCategory }
            data-testid={ `${strCategory}-category-filter` }
            onClick={ (e) => handleFilter(e.target) }
          >
            { strCategory }
          </button>
        ))}
      </section>
      <section className="recipes-container">
        { type === 'meal' ? recipes.map((recipe, index) => (
          <MealCards
            data={ recipe }
            index={ index }
            key={ recipe.idMeal }
          />
        )) : recipes.map((recipe, index) => (
          <DrinkCards
            data={ recipe }
            index={ index }
            key={ recipe.idDrink }
          />
        ))}
      </section>
    </>
  );
}

MainRecipes.propTypes = {
  categories: PropTypes.array,
  recipes: PropTypes.array,
  handleFilter: PropTypes.func,
}.isRequired;

export default MainRecipes;
