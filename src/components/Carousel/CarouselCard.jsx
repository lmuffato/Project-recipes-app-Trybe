import React from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import Button from '../Generics/Button';
import { CarouselCardContainer } from './styles';

function CarouselCard({ index, recommendation, type }) {
  const recipe = recommendation;
  const history = useHistory();
  const recipeName = recommendation.strMeal || recommendation.strDrink;
  const recipeThumb = recommendation.strMealThumb || recommendation.strDrinkThumb;
  const handleClick = (ev) => {
    ev.preventDefault();
    history.push(`/comidas/${recipe.idMeal}`);
  };

  return (
    type === 'meals ' ? (
      <CarouselCardContainer>
        <Button
          onClick={ (ev) => handleClick(ev) }
        >
          <div>
            <div className="img-wrapper">
              <img
                data-testid={ `${index}-card-img` }
                src={ recipeThumb }
                alt="Delicious food/drink"
              />
            </div>
            <div className="recipe-info">
              <div data-testid={ `${index}-recomendation-title` }>{recipeName}</div>
            </div>
          </div>
        </Button>
      </CarouselCardContainer>
    ) : (
      <CarouselCardContainer>
        <Link
          to={ {
            pathname: `/bebidas/${recommendation.idDrink}`,
            state: { recipe, type } } }
        >
          <div>
            <div className="img-wrapper">
              <img
                data-testid={ `${index}-card-img` }
                src={ recipeThumb }
                alt="Delicious food/drink"
              />
            </div>
            <div className="recipe-info">
              <div data-testid={ `${index}-recomendation-title` }>{recipeName}</div>
            </div>
          </div>
        </Link>
      </CarouselCardContainer>
    )
  );
}

export default CarouselCard;

CarouselCard.propTypes = {
  type: PropTypes.string.isRequired,
  recommendation: PropTypes.shape().isRequired,
  index: PropTypes.string.isRequired,
};
