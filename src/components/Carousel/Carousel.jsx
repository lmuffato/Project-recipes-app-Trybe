import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import CarouselWrapper from './styles';
import CardGrid from '../CardList/CardGrid';
import useDetailsProvider from '../../hooks/useDetailsProvider';

function Carousel({ recipeRecommendations, type }) {
  const currRecomendation = type === 'meals' ? 'drinks' : 'meals';
  const recommend = recipeRecommendations;
  const { setIsRecommended } = useDetailsProvider();
  // const [firstSelectedImageIndex, setSelectedImageIndex] = useState(0);
  // const [secondSelectedImageIndex, setSecondSelectedImageIndex] = useState(1);

  useEffect(() => {
    setIsRecommended(true);
  }, [setIsRecommended]);

  return (
    <CarouselWrapper>
      <div className="title-wrapper">
        <h3>Recomendadas</h3>
      </div>
      <div className="card-grid">
        <CardGrid
          recipes={ recommend }
          type={ currRecomendation || type }
        />
      </div>
    </CarouselWrapper>
  );
}

export default Carousel;
Carousel.propTypes = {
  recipeRecommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};
