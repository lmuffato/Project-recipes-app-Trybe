import React from 'react';
import PropTypes from 'prop-types';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

export default function Recomendations({ data }) {
  return (
    <OwlCarousel
      items={ 2 }
      className="owl-theme carousel-container"
      loop={ false }
      rewind
      nav
      margin={ 8 }
    >
      {data.map((reco, index) => {
        const title = reco.strMeal !== undefined ? 'strMeal' : 'strDrink';
        // if (index < 2) {
        //   return (
        //     <div data-testid={ `${index}-recomendation-card` }>
        //       <img src={ reco[`${title}Thumb`] } alt="" />
        //       <span data-testid={ `${index}-recomendation-title` }>
        //         {reco[title]}
        //       </span>
        //     </div>
        //   );
        // }
        return (
          <div
            key={ index }
            data-testid={ `${index}-recomendation-card` }
            className="item"
          >
            <img src={ reco[`${title}Thumb`] } alt="" />
            <span data-testid={ `${index}-recomendation-title` }>
              {reco[title]}
            </span>
          </div>
        );
      })}
    </OwlCarousel>
  );
}

Recomendations.propTypes = {
  data: PropTypes.shape({}).isRequired,
}.isRequired;
