import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './styles';
// import CarouselCard from './CarouselCard';
import CardList from '../CardList/CardList';
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
      const data = fetchData(currRecomendation).slice(0, MAX_LENGTH);
      setRecomendations(data);
      // setCurrentImage(0);
    }
  }, [currRecomendation, fetchData]);

  return (
    <CarouselWrapper>
      <div className="title-wrapper">
        <h3>Recomendadas</h3>
      </div>
      <div className="card-grid">
        {/* { recommendations.map((recommendation, index) => (
          <div
            className="carousel-card-tracker center"
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <CardList
              recommendation={ recommendation }
              index={ currentImage }
              type={ type }
            />
          </div>
        ))} */}
        <CardList recipes={ recommendations } type={ type } />
      </div>
      {/* <div className="right">ícone right</div> */}
      {/* <div className="left">ícone left</div> */}
    </CarouselWrapper>
  );
}

export default Carousel;
Carousel.propTypes = {
  type: PropTypes.string.isRequired,
};
