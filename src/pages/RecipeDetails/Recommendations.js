import React, { useContext, useEffect, useState } from 'react';
import RecomCard from './RecomCard';
import { fetchRecipesApi } from '../../services/fetchApiMain';
import { AppContext } from '../../context/AppContext';

export default function Recommendations() {
  const { context } = useContext(AppContext);
  const { pageOrigin } = context;
  const [recommended, setRecommended] = useState([]);
  const NUM_RECIPES_SHOWN = 6;

  useEffect(() => {
    fetchRecipesApi(pageOrigin === 'themealdb' ? 'thecocktaildb' : 'themealdb')
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
