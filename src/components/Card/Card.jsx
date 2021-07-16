import React from 'react';
import PropTypes from 'prop-types';
import useDetailsProvider from '../../hooks/useDetailsProvider';
import CardContainer, { RecommendationCardsContainer } from './styles';
import letmeEatIcon from '../../images/icon-letmeEatApp.svg';

function Card(props) {
  const { recipe, index } = props;
  const recipeCategory = recipe.strAlcoholic || recipe.strCategory;
  const recipeName = recipe.strMeal || recipe.strDrink;
  const recipeThumb = recipe.strMealThumb || recipe.strDrinkThumb;
  const { isRecommended } = useDetailsProvider();

  if (isRecommended) {
    return (
      <RecommendationCardsContainer>
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
              <span
                data-testid={ `${index}-recomendation-title` }
                className="card-info-paragraph"
              >
                { recipeName }
                <span>
                  <img src={ letmeEatIcon } alt="logo letmeEat" />
                </span>
              </span>
              <br />
              <div className="recipe-category">
                <p>{ recipeCategory }</p>
              </div>
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
              <span
                data-testid={ `${index}-recomendation-title` }
                className="card-info-paragraph"
              >
                { recipeName }
                <span>
                  <img src={ letmeEatIcon } alt="logo letmeEat" />
                </span>
              </span>
              <br />
              <div className="recipe-category">
                <p>{ recipeCategory }</p>
              </div>
            </div>
          </div>
        )}
      </RecommendationCardsContainer>
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
