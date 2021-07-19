import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomCard from './RecomCard';
import { fetchRecipesApi } from '../../services/fetchApiMain';
import './recipesDetails.css';
import CarouselBtn from './CarouselBtn';
import Loading from '../../components/Loading/Loading';

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

  function renderCarousel() {
    return (
      <div className="carousel-container">
        <div className="btn-content">
          <CarouselBtn
            direction="prev"
            recommended={ recommended }
          />
        </div>
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
        <div className="btn-content">
          <CarouselBtn
            direction="next"
            recommended={ recommended }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="recommended">
      <h3>Recommended</h3>
      { recommended.length
        ? renderCarousel()
        : <Loading />}
    </div>
  );
}

Recommendations.propTypes = {
  path: PropTypes.string.isRequired,
};
