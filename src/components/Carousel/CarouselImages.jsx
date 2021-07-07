import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './styles';
import CarouselCard from './CarouselCard';
import CardListContainer from '../CardList/styles';
// import Card from '../Card/Card';

function CarouselImages({ recipeRecommendations }) {
  const [recipes, setRecipes] = useState([]);
  const [firstSelectedImageIndex, setSelectedImageIndex] = useState(0);
  const [secondSelectedImageIndex, setSecondSelectedImageIndex] = useState(1);
  const [firstSelectedImage, setSelectedImage] = useState();
  const [secondSelectedImage, setSecondSelectedImage] = useState();
  // const carouselItemsRef = useRef([]);
  // const firstRecipeThumb = firstSelectedImage.strMealThumb
  // || firstSelectedImage.strDrinkThumb;
  // const secondRecipeThumb = secondSelectedImage.strMealThumb
  // || secondSelectedImage.strDrinkThumb;
  // const recipeName = strMeal || strDrink;

  useEffect(() => {
    setRecipes(recipeRecommendations);
  }, [recipeRecommendations]);

  useEffect(() => {
    setSelectedImageIndex(0);
    setSecondSelectedImageIndex(1);
    setSelectedImage(recipes[0]);
    setSecondSelectedImage(recipes[1]);
    console.log(firstSelectedImage, 'teste');
  }, [firstSelectedImage, recipes]);

  const handleSelectedImageChange = (newIndex, sndNewIndex) => {
    if (recipeRecommendations && recipeRecommendations.length > 0) {
      setSelectedImage(recipeRecommendations[newIndex]); // primeira img
      setSecondSelectedImage(recipeRecommendations[sndNewIndex]); // segunda img
      setSelectedImageIndex(newIndex); // indice da primeira img
      setSecondSelectedImageIndex(sndNewIndex); // indice da segunda img
    }
  };

  const handleRightClick = () => {
    if (recipeRecommendations && recipeRecommendations.length > 0) {
      let newIndex = firstSelectedImageIndex + 1;
      let sndNewIndex = secondSelectedImageIndex + 1;
      if (newIndex < 0) {
        newIndex = recipeRecommendations.length + 1;
      }
      if (sndNewIndex < 1) {
        sndNewIndex = recipeRecommendations.length + 2;
      }
      handleSelectedImageChange(newIndex, sndNewIndex);
    }
  };

  const handleLeftClick = () => {
    if (recipeRecommendations && recipeRecommendations.length > 0) {
      let newIndex = firstSelectedImageIndex - 1;
      let sndNewIndex = secondSelectedImageIndex - 1;
      if (newIndex < 0) {
        newIndex = recipeRecommendations.length - 1;
      }
      if (sndNewIndex === 2) {
        sndNewIndex = recipeRecommendations.length - 2;
      }
      handleSelectedImageChange(newIndex, sndNewIndex);
    }
  };

  if (recipes) {
    return (
      <CarouselWrapper>
        <div className="title-wrapper">
          <h3>Recomendadas</h3>
        </div>
        <div className="card-grid">
          <CardListContainer>
            <CarouselCard
              recommendation={ firstSelectedImage }
              index={ firstSelectedImageIndex }
            />
          </CardListContainer>
          <div className="carousel">
            <button
              type="button"
              onClick={ handleLeftClick }
            >
              Prev
            </button>
            <button
              type="button"
              onClick={ handleRightClick }
            >
              Next
            </button>
          </div>
        </div>
      </CarouselWrapper>
    );
  }
}

export default CarouselImages;
CarouselImages.propTypes = {
  recipeRecommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
