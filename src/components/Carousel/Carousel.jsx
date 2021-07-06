import React from 'react';
import PropTypes from 'prop-types';
import CarouselContainer from './styles';
import Card from '../Card/Card';

function Carousel({ recommendations }) {
  // const [currentImage, setCurrentImage] = useState(0);

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
  recommendations: PropTypes.arrayOf(PropTypes.object).isRequired,
};
