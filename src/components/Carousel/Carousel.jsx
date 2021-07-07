import React from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './styles';
// import useFetchRecipes from '../../effects/useFetchRecipes';
import CardList from '../CardList/CardList';
// import useDetailsProvider from '../../hooks/useDetailsProvider';

// const endpointMeal = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
// const endpointDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

function Carousel({ recipeRecommendations, currentImg, currRecommendation, type }) {
  const recommend = recipeRecommendations;
  const imgAtual = currentImg;
  const typeOfPage = currRecommendation;

  return (
    <CarouselWrapper>
      <div className="title-wrapper">
        <h3>Recomendadas</h3>
      </div>
      <div className="card-grid">
        <CardList
          recipes={ recommend }
          type={ typeOfPage || type }
          titleTestId={ `${imgAtual}-recomendation-title` }
          cardTestId={ `${imgAtual}-recomendation-card` }
        />
      </div>
      {/* <div className="right">ícone right</div> */}
      {/* <div className="left">ícone left</div> */}
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
