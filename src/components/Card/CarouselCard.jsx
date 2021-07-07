import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CardContainer from './styles';

function CarouselCard({ index, recommendation }) {
  const recipe = recommendation;

  const recipeName = recipe.strDrink || recipe.strMeal;
  const recipeThumb = recipe.strDrinkThumb || recipe.strMealThumb;
  const recipeCategory = recipe.strCategory || '';
  const recipeAlcoholic = recipe.strAlcoholic || '';
  const recipeURLPath = `/bebidas/${recipe.idDrink}` || `/comidas/${recipe.idMeal}`;

  // if (type === 'comidas') {
  //   recipeName = recipe.strDrink;
  //   recipeThumb = recipe.strDrinkThumb;
  //   recipeCategory = recipe.strAlcoholic;
  //   recipeURLPath = `/bebidas/${recipe.idDrink}`;
  // } else {
  //   recipeName = recipe.strMeal;
  //   recipeThumb = recipe.strMealThumb;
  //   recipeCategory = recipe.strCategory;
  //   recipeURLPath = `/comidas/${recipe.idMeal}`;
  // }

  if (recipe) {
    return (
      <Link to={ recipeURLPath }>
        <CardContainer>
          <div datat-testid={ `${index}-recomendation-card` }>
            <div className="img-wrapper">
              <img src={ recipeThumb } alt="Delicious food/drink" />
            </div>
            <div className="card-info">
              <p data-testid={ `${index}-recomendation-title` }>
                { recipeName }
              </p>
              { recipeAlcoholic
                ? (<p>{ recipeAlcoholic }</p>) : (<p>{ recipeCategory }</p>)}
            </div>
          </div>
        </CardContainer>
      </Link>
    );
  }
}

export default CarouselCard;

CarouselCard.propTypes = {
  type: PropTypes.string.isRequired,
  recommendation: PropTypes.shape().isRequired,
  index: PropTypes.string.isRequired,
};
