import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RecipeCard from '../components/RecipeCard';
import { fetchAreas, fetchByArea, fetchName } from '../services/data';

export default function FoodArea() {
  const [recipes, setRecipes] = useState([]);
  const [areas, setAreas] = useState([]);
  const [region, setRegion] = useState('All');

  const filter12Recipes = (rcp) => {
    const maxLengthRecipes = 12;
    const filteredRecipe = rcp.filter(
      (drink, index) => index < maxLengthRecipes,
    );
    return filteredRecipe;
  };

  useEffect(() => {
    const fetchDidMount = async () => {
      const responseAreas = await fetchAreas();
      setAreas(responseAreas.meals);
    };

    fetchDidMount();
  }, []);

  useEffect(() => {
    const fetchCategory = async () => {
      if (region === 'All') {
        const responseRecipesByArea = await fetchName('meal');
        setRecipes(filter12Recipes(responseRecipesByArea.meals));
        return;
      }

      const responseByRegion = await fetchByArea(region);
      setRecipes(filter12Recipes((responseByRegion.meals)));
    };

    fetchCategory();
  }, [region]);

  return (
    <div>
      <Header title="Explorar Origem" searchIcon />

      <select
        data-testid="explore-by-area-dropdown"
        onChange={ ({ target }) => setRegion(target.value) }
      >
        <option value="All" data-testid="All-option">All</option>
        {areas.map(({ strArea }) => (
          <option
            data-testid={ `${strArea}-option` }
            value={ strArea }
            key={ strArea }
          >
            {strArea}
          </option>
        ))}
      </select>

      {recipes.map((recipe, index) => (
        <RecipeCard
          key={ recipe.idMeal }
          index={ index }
          thumb={ recipe.strMealThumb }
          title={ recipe.strMeal }
          id={ recipe.idMeal }
        />
      ))}

      <Footer />
    </div>
  );
}
