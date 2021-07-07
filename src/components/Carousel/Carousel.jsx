import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './styles';
// import useFetchRecipes from '../../effects/useFetchRecipes';
import CardList from '../CardList/CardList';
// import useDetailsProvider from '../../hooks/useDetailsProvider';

// const endpointMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const endpointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Carousel({ recipeRecommendations, currentImg, type }) {
  const currRecomendation = type === 'meals' ? 'drinks' : 'meals';
  const recommend = recipeRecommendations;
  const imgAtual = currentImg;
  // const typeOfPage = currRecommendation;
  const [firstSelectedImageIndex, setSelectedImageIndex] = useState(0);
  const [secondSelectedImageIndex, setSecondSelectedImageIndex] = useState(1);

  useEffect(() => {
    setSelectedImageIndex(0);
    setSecondSelectedImageIndex(1);
  }, []);

  return (
    <CarouselWrapper>
      <div className="title-wrapper">
        <h3>Recomendadas</h3>
      </div>
      <div className="card-grid">
        <CardList
          recipes={ recommend }
          type={ currRecomendation || type }
          titleTestId={ `${imgAtual}-recomendation-title` } // provavel que vai sair daqui
          cardTestId={ `${imgAtual}-recomendation-card` } // provavel que vai sair daqui
        />
      </div>
      <div className="carousel">
        <button
          type="button"
          // onClick={ handleLeftClick }
        >
          Prev
        </button>
        <button
          type="button"
          // onClick={ handleRightClick }
        >
          Next
        </button>
      </div>
    </CarouselWrapper>
  );
}

export default Carousel;
Carousel.propTypes = {
  recipeRecommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  currentImg: PropTypes.number.isRequired,
  currRecommendation: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};
