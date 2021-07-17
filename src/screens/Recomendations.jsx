import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import RecomCard from './RecomCard';
import Card from '../components/Card';
import fetchRecomendations from '../service/fetchRecomendations';

function Recommendations(props) {
  const { recipe } = props;
  const type = recipe === 'themealdb' ? 'Meal' : 'Drink';
  const pathname = type === 'Meal' ? '/comidas' : '/bebidas';
  const [recommended, setRecommended] = useState({});

  useEffect(() => {
    async function requestRecom() {
      const request = await fetchRecomendations(recipe);
      return setRecommended(request);
    }
    requestRecom();
  }, []);

  return (
    <div>
      <h3>Recomendados</h3>
      { recommended.length ? recommended.map((recom, index) => {
        const testid = {
          image: 'recipe-photo',
          title: 'recipe-title',
          card: `${index}-recomendation-card`,
        };
        const redirectPath = `${pathname}/${recom[`id${type}`]}`;
        return (
          <div
            data-testid={ `${index}-recomendation-card` }
            key={ index }
          >
            <Card
              src={ recom[`str${type}Thumb`] }
              title={ recom[`str${type}`] }
              index={ index }
              key={ index }
              testid={ testid }
              redirectPath={ redirectPath }
            />
            <RecomCard recipe={ recom } index={ index } />
          </div>
        );
      }) : ''}
    </div>
  );
}

Recommendations.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default Recommendations;
