import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import './recipesMain.css';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import MenuFooter from '../../components/menuFooter/index';
import RecipeCard from './RecipeCard';
import Categories from './Categories';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Loading/Loading';

export default function RecipesMain({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { recipesList, setPageOrigin, pageOrigin, isLoading } = context;

  useEffect(() => {
    setPageOrigin(path === '/comidas' ? 'themealdb' : 'thecocktaildb');
  });

  return (
    <div className="main-container">
      <Header title={ pageOrigin === 'themealdb' ? 'Comidas' : 'Bebidas' } />

      <Categories />

      <div className="list-main-recipes">
        {
          isLoading
            ? <Loading /> : recipesList.map(
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
                    isMain
                    path={ path }
                  />
                </Link>
              ),
            )
        }

      </div>
      <MenuFooter />
    </div>
  );
}

RecipesMain.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
