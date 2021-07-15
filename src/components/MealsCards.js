import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { arrayOf, shape, string } from 'prop-types';
import { useSelector } from 'react-redux';
import { head } from 'lodash';

import { MEALS_BY_FIRST_LETTER_ENDPOINT,
  MEALS_BY_INGREDIENT_ENDPOINT,
  MEALS_BY_NAME_ENDPOINT } from '../services/meals';

const customAlert = alert;
function shouldRedirect(endpoint) {
  const endpointShouldRedirect = [
    MEALS_BY_FIRST_LETTER_ENDPOINT(''),
    MEALS_BY_NAME_ENDPOINT(''),
    MEALS_BY_INGREDIENT_ENDPOINT(''),
  ];
  return endpointShouldRedirect.some((element) => endpoint.includes(element));
}
function MealsCards({ meals }) {
  const URL = useSelector((state) => state.loading.requestedURL);

  const LAST_MEAL_INDEX = 12;
  const onlyTheFirst12 = (_recipe, index) => index < LAST_MEAL_INDEX;
  if (meals === null) {
    customAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <div>Tente novamente</div>;
  }
  if (meals.length === 1 && shouldRedirect(URL)) {
    return <Redirect to={ `/comidas/${head(meals).idMeal}` } />;
  }
  // happy path
  return (
    <div className="recipe-container">
      {meals.filter(onlyTheFirst12).map((meal, index) => (

        <Link
          className="recipe-card"
          data-testid={ `${index}-recipe-card` }
          key={ meal.idMeal }
          to={ `/comidas/${meal.idMeal}` }
        >

          <div className="img-crop">
            <img
              data-testid={ `${index}-card-img` }
              src={ meal.strMealThumb }
              alt={ meal.strMeal }
              // width="100"
              // height="100"
            />
          </div>

          <p data-testid={ `${index}-card-name` }>{meal.strMeal}</p>
        </Link>
      ))}
    </div>
  );
}

MealsCards.propTypes = {
  meals: arrayOf(
    shape(
      { idMeal: string,
        strMeal: string,
        strMealThumb: string },
    ),
  ),
};

MealsCards.defaultProps = {
  meals: [],
};

export default MealsCards;
