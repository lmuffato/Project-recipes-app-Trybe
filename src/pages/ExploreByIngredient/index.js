import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import MenuFooter from '../../components/menuFooter';
import RecipeCard from '../RecipesMain/RecipeCard';
import { AppContext } from '../../context/AppContext';
import { fetchApiIngredients } from '../../services/fetchApiIngredients';

export default function ExploreByIngredient({ match }) {
  const { path } = match;
  const { context } = useContext(AppContext);
  const { setByIngredients, byIngredients } = context;
  const NUM_RECIPES_SHOWN = 12;

  useEffect(() => {
    fetchApiIngredients(path.includes('/comidas') ? 'themealdb' : 'thecocktaildb')
      .then((ingredients) => {
        ingredients.splice(NUM_RECIPES_SHOWN, ingredients.length - 1);
        setByIngredients(ingredients);
      });
  }, [path]);

  return (
    <div>
      <Header title="Explorar Ingredients" isSearch={ false } />
      <div className="list-main-recipes">
        { byIngredients && byIngredients.map(
          (ingredient, index) => (
            <Link
              to={ path.includes('/comidas')
                ? '/comidas'
                : '/bebidas}' }
              key={ ingredient.idIngredient || ingredient.strIngredient1 }
            >
              <RecipeCard
                recipe={ ingredient }
                index={ index }
                isMain={ false }
                path={ path.includes('/comidas') ? 'themealdb' : 'thecocktaildb' }
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
