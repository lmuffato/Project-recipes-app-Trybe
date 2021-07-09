import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomCard from './RecomCard';
import { fetchRecipesApi } from '../../services/fetchApiMain';

export default function Recommendations({ path }) {
  const [recommended, setRecommended] = useState([]);

  const NUM_RECIPES_SHOWN = 6;

  useEffect(() => {
    fetchRecipesApi(path.includes('/comidas') ? 'thecocktaildb' : 'themealdb')
      .then((recipes) => {
        recipes.splice(NUM_RECIPES_SHOWN, recipes.length - 1);
        setRecommended(recipes);
      });
  }, []);

  return (
    <div>
      <h3>Recommendeds</h3>
      { recommended.length
        ? recommended.map(
          (recomRecipe, index) => (
            <div
              data-testid="0-recomendation-card"
              key={ index }
            >
              <RecomCard recipe={ recomRecipe } />
            </div>
          ),
        ) : ''}
    </div>
  );
}

Recommendations.propTypes = {
  path: PropTypes.string.isRequired,
};
