import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselContainer from './styles';
import Card from '../Card/Card';
import useFetchRecipes from '../../effects/useFetchRecipes';

const MAX_LENGTH = 6;
function Carousel({ type }) {
  // const [currentImage, setCurrentImage] = useState(0);
  const [recommendations, setRecomendations] = useState([]);
  const currRecomendation = type === 'meals' ? 'drinks' : 'meals';
  const fetchData = useFetchRecipes(currRecomendation);
  // espera que o fetch à API tenha sido realizado -- se pg de comidas, recomendaçoes de bebidas
  // se pg de bebidas, recomendaçoes de comidas

  useEffect(() => {
    if (fetchData[currRecomendation]) {
      setRecomendations(fetchData[currRecomendation].slice(0, MAX_LENGTH));
    }
  }, [currRecomendation, fetchData]);

  return (
    <CarouselContainer>
      <div className="carouselInner">
        { recommendations.map((recommendation, index) => (
          <div
            className="carousel-img"
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <Card recipe={ recommendation } index={ index } />
          </div>
        ))}
      </div>
    </CarouselContainer>
  );
}

export default Carousel;
Carousel.propTypes = {
  type: PropTypes.string.isRequired,
};
