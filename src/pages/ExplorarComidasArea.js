import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodContext from '../contexts/FoodContext';
import RecipeCard from '../components/Main/RecipeCard';
import { fetchFoodArea, fetchFoods } from '../services/mealAPI';

export default function ExplorarComidasArea() {
  const { foods, setFoods } = useContext(FoodContext);
  const [areaNameToOptions, setAreaNameToOptions] = useState([]);
  const NUMBER_OF_RECIPES = 12;

  useEffect(() => {
    fetchFoodArea().then((res) => setAreaNameToOptions(res.meals));
  }, []);

  function filterFoodByArea(area) {
    if (area === 'All') {
      fetchFoods().then(({ meals }) => {
        setFoods(meals);
      });
    } else {
      fetchFoods().then(({ meals }) => {
        const filteredMeal = meals.filter((meal) => meal.strArea === area);
        setFoods(filteredMeal);
      });
    }
  }

  return (
    <div>
      <Header
        title="Explorar Origem"
      />
      <label htmlFor="explore-by-area-dropdown">
        Selecione
        <select
          name="explore-by-area-dropdown"
          data-testid="explore-by-area-dropdown"
          onClick={ (event) => filterFoodByArea(event.target.value) }
        >
          { areaNameToOptions && areaNameToOptions.map(({ idMeal, strArea }) => (
            <option
              value={ strArea }
              key={ idMeal }
              data-testid={ `${strArea}-option` }
            >
              { strArea }
            </option>
          ))}
          <option> All </option>
        </select>
      </label>
      <main>
        <ul>
          { foods && foods.slice(0, NUMBER_OF_RECIPES)
            .map((recipe, index) => (
              <RecipeCard
                key={ index }
                recipe={ recipe }
                index={ index }
                type="/comidas"
              />
            ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
}
