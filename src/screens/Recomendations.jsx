import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../components/Card';
import fetchRecomendations from '../service/fetchRecomendations';

function Recommendations(props) {
  const { recipe } = props;
  const type = recipe === 'themealdb' ? 'Drink' : 'Meal';
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
      { recommended.length ? recommended.reduce((acc, recom, index) => {
        const cardsLength = 6;
        if (index < cardsLength) {
          const testid = {
            image: 'recipe-photo',
            title: 'recipe-title',
            card: `${index}-recomendation-card`,
          };
          const redirectPath = `${pathname}/${recom[`id${type}`]}`;
          acc.push(
            <Card
              src={ recom[`str${type}Thumb`] }
              title={ recom[`str${type}`] }
              index={ index }
              key={ index }
              testid={ testid }
              redirectPath={ redirectPath }
            />,
          );
        }
        return acc;
      }, []) : ''}
    </div>
  );
}

Recommendations.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default Recommendations;
