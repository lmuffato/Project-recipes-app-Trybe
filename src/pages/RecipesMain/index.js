import React, { useContext } from 'react';
/* import PropTypes from 'prop-types'; */
import './recipesMain.css';
import Header from '../../components/header';
import MenuFoot from '../../components/menuFoot';

import RecipeCard from './RecipeCard';
import Categories from './Categories';
import { AppContext } from '../../context/AppContext';

export default function RecipesMain() {
  const { context } = useContext(AppContext);
  const { recipesList } = context;

  return (
    <div>
      <Header />
      <Categories />
      <div className="list-main-recipes">
        { recipesList && recipesList.map(
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
