import React, { useContext, useEffect, useState } from 'react';
import PropTypes, { shape } from 'prop-types';
import './recipesMain.css';
import { useHistory } from 'react-router';
import Header from '../../components/header';
import MenuFoot from '../../components/menuFoot';

import RecipeCard from './RecipeCard';
import Categories from './Categories';
import { AppContext } from '../../context/AppContext';

export default function RecipesMain({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { recipesList, setPageOrigin } = context;
  const [title, setTitle] = useState('COMIDAS');
  const history = useHistory();
  useEffect(() => {
    if (path === '/comidas') {
      setPageOrigin('themealdb');
      setTitle('COMIDAS');
    } if (path === '/bebidas') {
      setPageOrigin('thecocktaildb');
      setTitle('BEBIDAS');
    }
  }, []);
  return (

    <div>
      <Header title={ title } />
      <Categories />
      <div className="list-main-recipes">
        { recipesList.length === 1 ? recipesList.map((oneRecipe) => (
          history.push(`${path}/${oneRecipe.idMeal || oneRecipe.idDrink}`)
        ))
          : recipesList.map(
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
