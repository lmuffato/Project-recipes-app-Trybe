import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import fetchRecomendations from '../service/fetchRecomendations';
import '../styleSheets/Recomendations.css';

function Recommendations(props) {
  const { recipe } = props;
  const type = recipe === 'themealdb' ? 'Drink' : 'Meal';
  const pathname = type === 'Meal' ? '/comidas' : '/bebidas';
  const [recommended, setRecommended] = useState([]);
  const [isLoalding, setIsLoalding] = useState(false);

  useEffect(() => {
    setIsLoalding(true);
    async function requestRecom() {
      const request = await fetchRecomendations(recipe);
      setRecommended(request);
      setIsLoalding(false);
    }
    requestRecom();
  }, []);

  return (
    <section>
      <h4>Recomendados</h4>
      <div className="container">
        <div className="carousel-container">
          {
            isLoalding ? '' : recommended.reduce((acc, recom, index) => {
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
            }, [])
          }
        </div>
      </div>
    </section>
  );
}

Recommendations.propTypes = {
  recipe: PropTypes.string.isRequired,
};

export default Recommendations;
