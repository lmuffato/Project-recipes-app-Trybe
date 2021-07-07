import React from 'react';
import PropTypes from 'prop-types';
import useDetailsProvider from '../../hooks/useDetailsProvider';
import CardContainer from './styles';
// recommendationCardTestId
// `${index}-recipe-card`
function Card(props) {
  const { recipe, index } = props;
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const { isRecommended } = useDetailsProvider();

  if (isRecommended) {
    return (
      <CardContainer>
        { index > 1 ? (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="invisible"
          >
            <div className="img-wrapper">
              <img
                data-testid={ `${index}-card-img` }
                src={ recipeThumb }
                alt="Delicious food/drink"
              />
            </div>
            <div className="card-info">
              <p
                data-testid={ `${index}-recomendation-title` }
                className="card-info-paragraph"
              >
                { recipeName }
              </p>
            </div>
          </div>
        ) : (
          <div
            data-testid={ `${index}-recomendation-card` }
            className="visible"
          >
            <div className="img-wrapper">
              <img
                data-testid={ `${index}-card-img` }
                src={ recipeThumb }
                alt="Delicious food/drink"
              />
            </div>
            <div className="card-info">
              <p
                data-testid={ `${index}-recomendation-title` }
                className="card-info-paragraph"
              >
                { recipeName }
              </p>
            </div>
          </div>
        )}
      </CardContainer>
    );
  }

  return (
    <CardContainer>
      <div data-testid={ `${index}-recipe-card` }>
        <div className="img-wrapper">
          <img
            data-testid={ `${index}-card-img` }
            src={ recipeThumb }
            alt="Delicious food/drink"
          />
        </div>
        <div className="card-info">
          <p data-testid={ `${index}-card-name` }>{ recipeName }</p>
        </div>
      </div>
    </CardContainer>
  );
}

Card.propTypes = {
  recipe: PropTypes.shape(),
}.isRequired;

export default Card;
