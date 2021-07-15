import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { arrayOf, shape, string } from 'prop-types';
import { useSelector } from 'react-redux';
import { head } from 'lodash';

import { DRINKS_BY_FIRST_LETTER_ENDPOINT,
  DRINKS_BY_INGREDIENT_ENDPOINT,
  DRINKS_BY_NAME_ENDPOINT } from '../services/drinks';

const customAlert = alert;
function shouldRedirect(endpoint) {
  const endpointShouldRedirect = [
    DRINKS_BY_FIRST_LETTER_ENDPOINT(''),
    DRINKS_BY_NAME_ENDPOINT(''),
    DRINKS_BY_INGREDIENT_ENDPOINT(''),
  ];
  return endpointShouldRedirect.some((element) => endpoint.includes(element));
}
function DrinksCards({ drinks }) {
  const URL = useSelector((state) => state.loading.requestedURL);

  const LAST_DRINK_INDEX = 12;
  const onlyTheFirst12 = (_recipe, index) => index < LAST_DRINK_INDEX;
  if (drinks === null) {
    customAlert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return <div>Tente novamente</div>;
  }
  if (drinks.length === 1 && shouldRedirect(URL)) {
    return <Redirect to={ `/bebidas/${head(drinks).idDrink}` } />;
  }
  // happy path
  return (
    <div className="recipe-container">
      {drinks.filter(onlyTheFirst12).map((drink, index) => (
        <Link
          className="recipe-card"
          data-testid={ `${index}-recipe-card` }
          key={ drink.idDrink }
          to={ `/bebidas/${drink.idDrink}` }
        >
          <div className="img-crop">
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
              width="100"
              height="100"
            />
          </div>
          <p data-testid={ `${index}-card-name` }>{drink.strDrink}</p>
        </Link>
      ))}
    </div>
  );
}

DrinksCards.propTypes = {
  drinks: arrayOf(
    shape(
      { idDrink: string,
        strDrink: string,
        strDrinkThumb: string },
    ),
  ),
};

DrinksCards.defaultProps = {
  drinks: [],
};

export default DrinksCards;
