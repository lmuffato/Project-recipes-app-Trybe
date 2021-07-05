import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './recipesMain.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import Header from '../../components/header';
import MenuFoot from '../../components/menuFoot';

import RecipeCard from './RecipeCard';
import Categories from './Categories';
import { AppContext } from '../../context/AppContext';

export default function RecipesMain({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { recipesList, setPageOrigin, pageOrigin } = context;
  // const [title, setTitle] = useState('COMIDAS');
  const history = useHistory();

  useEffect(() => {
    setPageOrigin(path === '/comidas' ? 'themealdb' : 'thecocktaildb');
  }, []);

  return (
    <div>
      <Header title={ pageOrigin === 'themealdb' ? 'Comidas' : 'Bebidas' } />
      <Categories />
      <div className="list-main-recipes">
        { recipesList.length === 1 ? recipesList.map((oneRecipe) => (
          history.push(`${path}/${oneRecipe.idMeal || oneRecipe.idDrink}`)
        ))
          : recipesList.map(
            (recipe, index) => (
              <Link
                to={ pageOrigin === 'themealdb'
                  ? `comidas/${recipe.idMeal}`
                  : `bebidas/${recipe.idDrink}` }
                key={ recipe.idMeal || recipe.idDrink }
              >
                <RecipeCard
                  recipe={ recipe }
                  index={ index }
                />
              </Link>
            ),
          )}
      </div>
      <MenuFoot />
    </div>
  );
}

RecipesMain.propTypes = {
  match: PropTypes.arrayOf(PropTypes.shape({
    path: PropTypes.string.isRequired,
  })).isRequired,
};
