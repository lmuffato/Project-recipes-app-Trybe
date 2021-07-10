import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomCard from './RecomCard';
import { fetchRecipesApi } from '../../services/fetchApiMain';
import './recipesDetails.css';

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

  function handleCarousel(direction) {
    const next = direction === 'next';
    let nextActiveId = null;
    let activeId = null;

    const recipesShown = document.getElementsByClassName('carousel active');

    if (recipesShown[0].id === '0' && recipesShown[1].id === '5') {
      activeId = Number(recipesShown[next ? 1 : 0].id);
      recipesShown[next ? 1 : 0].className = 'carousel';
      nextActiveId = next ? 1 : 4;
    } else {
      activeId = Number(recipesShown[next ? 0 : 1].id);
      recipesShown[next ? 0 : 1].className = 'carousel';

      if (next ? (activeId < recommended.length - 2) : (activeId > 1)) {
        nextActiveId = next ? (activeId + 2) : (activeId - 2);
      } else {
        nextActiveId = next ? 0 : 5;
      }
    }
    document.getElementById(nextActiveId).className = 'carousel active';
  }

  function renderCarousel() {
    console.log(recommended[0]);
    return (
      <div className="carousel-container">
        <button
          type="button"
          onClick={ () => handleCarousel('prev') }
        >
          {'<'}
        </button>
        {recommended.map(
          (recomRecipe, index) => (
            <div
              data-testid={ `${index}-recomendation-card` }
              key={ index }
              className={ `carousel ${index === 0 || index === 1 ? 'active' : ''}` }
              id={ index }
            >
              <RecomCard
                recipe={ recomRecipe }
                index={ index }
              />
            </div>
          ),
        ) }
        <button
          type="button"
          onClick={ () => handleCarousel('next') }
        >
          {'>'}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3>Recommended</h3>
      { recommended.length
        ? renderCarousel()
        : <span>Loading...</span>}
    </div>
  );
}

Recommendations.propTypes = {
  path: PropTypes.string.isRequired,
};
