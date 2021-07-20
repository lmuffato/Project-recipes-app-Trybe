import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CarouselProvider, Slider } from 'pure-react-carousel';
import CarouselWrapper from './styles';
import CardGrid from '../CardList/CardGrid';
import useDetailsProvider from '../../hooks/useDetailsProvider';

function Carousel({ recipeRecommendations, type }) {
  const currRecomendation = type === 'meals' ? 'drinks' : 'meals';
  const recommend = recipeRecommendations;
  const { setIsRecommended } = useDetailsProvider();

  useEffect(() => {
    let cancel = false;
    if (cancel) return;
    setIsRecommended(true);
    return () => {
      cancel = true;
    };
  }, [setIsRecommended]);

  return (
    <CarouselWrapper>
      <CarouselProvider
        naturalSlideWidth={ 120 }
        naturalSlideHeight={ 120 }
        visibleSlides={ 2 }
        totalSlides={ 6 }
      >
        <div className="card-grid">
          <Slider>
            <CardGrid recipes={ recommend } type={ currRecomendation || type } />
          </Slider>
        </div>
      </CarouselProvider>
    </CarouselWrapper>
  );
}

export default Carousel;
Carousel.propTypes = {
  recipeRecommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
  type: PropTypes.string.isRequired,
};

// Source - documentação da bilioteca de carousel: https://github.com/express-labs/pure-react-carousel#image-
// https://express-labs.github.io/pure-react-carousel/
