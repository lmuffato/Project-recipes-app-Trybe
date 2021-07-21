import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../../components/header';
import MenuFooter from '../../components/menuFooter';
import RecipeCard from '../RecipesMain/RecipeCard';
import { AppContext } from '../../context/AppContext';
import Loading from '../../components/Loading/Loading';
import '../RecipesMain/recipesMain.css';

export default function ExploreByIngredient({ match }) {
  const [isLoading, setIsLoading] = useState(false);
  const { path } = match;
  const { context } = useContext(AppContext);
  const { setByIngredients, byIngredients } = context;
  const NUM_RECIPES_SHOWN = 12;

  useEffect(() => {
    setIsLoading(true);
    const controller = new AbortController();
    const page = path.includes('/comidas') ? 'themealdb' : 'thecocktaildb';
    const url = `https://www.${page}.com/api/json/v1/1/list.php?i=list`;
    fetch(url, { signal: controller.signal })
      .then((data) => data.json())
      .then((data) => data.meals || data.drinks)
      .catch((error) => console.log(error))
      .then((ingredients) => {
        ingredients.splice(NUM_RECIPES_SHOWN, ingredients.length - 1);
        setByIngredients(ingredients);
        setIsLoading(false);
      });

    return (() => {
      setIsLoading(false);
      controller.abort();
    });
  }, [path]);

  return (
    <div className="main-container">
      <Header title="Explorar Ingredients" isSearch={ false } />
      <div className="list-main-recipes">
        {isLoading ? <Loading />
          : byIngredients && byIngredients.map(
            (ingredient, index) => (
              <Link
                to={ path.includes('/comidas')
                  ? '/comidas'
                  : '/bebidas}' }
                key={ ingredient.idIngredient || ingredient.strIngredient1 }
              >
                {' '}
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
