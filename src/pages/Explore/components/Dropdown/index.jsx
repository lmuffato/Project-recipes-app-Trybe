import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Card from '../../../../components/RecipesCardsGrid/components/RecipeSimpleCard';
import styles from '../ExploreCards/styles.module.scss';
import { mealsData, exploreMealsData } from '../../../../services/mealsData';

function Dropdown({ areas }) {
  const [recipes, setRecipes] = useState([]);

  async function getRecipes() {
    const response = await mealsData();
    if (response) {
      setRecipes(response.list.slice(0, Number('12')));
    }
  }

  async function filterRecipes(area) {
    const response = await exploreMealsData(area);
    if (response) {
      setRecipes(response.slice(0, Number('12')));
    }
  }

  useEffect(() => {
    getRecipes();
  }, []);

  if (!areas[0]) return <h1>Not Found</h1>;

  return (
    <>
      <select
        data-testid="explore-by-area-dropdown"
        name="area"
        onChange={ ({ target }) => filterRecipes(target.value) }
      >
        <option value="All" data-testid="All-option">All</option>
        {areas.map((area) => (
          <option
            key={ area.strArea }
            value={ area.strArea }
            data-testid={ `${area.strArea}-option` }
          >
            {area.strArea}
          </option>
        ))}
      </select>
      <section className={ styles.grid }>
        {recipes.map((recipe, index) => (
          <Card
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
            page="recipe"
          />
        ))}
      </section>
    </>
  );
}

Dropdown.propTypes = {
  areas: PropTypes.arrayOf(PropTypes.shape({
    strArea: PropTypes.string,
  }).isRequired),
}.isRequired;

export default Dropdown;
