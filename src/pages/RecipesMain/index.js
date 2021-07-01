import React, { useContext, useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import './recipesMain.css';
import Header from '../../components/header';
import MenuFoot from '../../components/menuFoot';

import RecipeCard from './RecipeCard';
import Categories from './Categories';
import { AppContext } from '../../context/AppContext';

export default function RecipesMain({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { recipesList, setPageOrigin } = context;

  useEffect(() => {
    if (path === '/comidas') {
      setPageOrigin('themealdb');
    } if (path === '/bebidas') {
      setPageOrigin('thecocktaildb');
    }
  }, []);
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

RecipesMain.propTypes = {

  match: PropTypes.arrayOf(shape({
    path: PropTypes.string.isRequired,
  })).isRequired,
};
