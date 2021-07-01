import React, { useEffect, useState, useContext } from 'react';
/* import PropTypes from 'prop-types'; */
import './recipesMain.css';
import Header from '../../components/header';
import MenuFoot from '../../components/menuFoot';
import { fetchRecipesApi } from '../../services/fetchApiMain';
import RecipeCard from './RecipeCard';
import Categories from './Categories';
import { AppContext } from '../../context/AppContext';

export default function RecipesMain() {
  const [recipesList, setRecipesList] = useState([]);
  const drinkOrFood = 'drink'; // informação mockada - virá do context!
  const NUM_RECIPES_SHOWN = 12;

  const { context } = useContext(AppContext);
  const { setPageOrigin } = context;

  useEffect(() => {
    setPageOrigin('themealdb');
  });

  useEffect(() => {
    fetchRecipesApi(drinkOrFood)
      .then((recipes) => {
        console.log(recipes);
        recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
        setRecipesList(recipes);
      });
  }, []);

  return (
    <div>
      <Header />
      <Categories />
      <div className="list-main-recipes">
        { recipesList.map(
          (recipe, index) => (
            <RecipeCard
              recipe={ recipe }
              key={ recipe.idMeal || recipe.idDrink }
              index={ index }
            />
          ),
        )}
      </div>
      <MenuFoot />
    </div>
  );
}
