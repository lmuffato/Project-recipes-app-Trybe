import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import MenuFooter from '../../components/menuFooter';
import RecipeCard from '../RecipesMain/RecipeCard';
import { AppContext } from '../../context/AppContext';

export default function ExploreByIngredient({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { recipesList, setPageOrigin, pageOrigin } = context;

  useEffect(() => {
    setPageOrigin(path.includes('/comidas') ? 'themealdb' : 'thecocktaildb');
  });
  return (
    <div>
      <Header title="Explorar Ingredients" isSearch={ false } />
      <div className="list-main-recipes">
        { recipesList.map(
          (recipe, index) => (
            <Link
              to={ pageOrigin === 'themealdb'
                ? '/comidas'
                : '/bebidas}' }
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
      <MenuFooter />
    </div>
  );
}
ExploreByIngredient.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }).isRequired,
};
