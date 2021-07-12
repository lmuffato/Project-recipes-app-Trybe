import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import Recomendations from '../Recomendations';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import RecipeButton from '../RecipeButton';
import getIngredients from '../../services/getIngredients';

function BebidasDetails({ data, recomendation }) {
  const { pathname } = useLocation();
  const { href } = window.location;
  const ingredients = getIngredients(data[0], 'strIngredient');
  const ingredientsMeasures = getIngredients(data[0], 'strMeasure');
  if (pathname.includes('/comidas')) {
    const { strDrink, strInstructions, strDrinkThumb,
      strAlcoholic, strCategory } = data[0];
    return (
      <div>
        <img src={ strDrinkThumb } alt="comida" data-testid="recipe-photo" />
        <h4 data-testid="recipe-title">{ strDrink }</h4>
        <ShareButton data-testid="share-btn" urlCopied={ href } />
        <FavoriteButton data={ data[0] } path={ pathname } />
        <p>{ strCategory }</p>
        {strAlcoholic === 'Alcoholic' ? (
          <p data-testid="recipe-category">Alcoholic</p>
        ) : (
          <br />
        )}
        <ul>
          { ingredients.map((ingredient, index) => (
            <li key={ ingredient }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                { ingredient[1] }
              </p>
            </li>
          ))}
          { ingredientsMeasures.map((measure, index) => (
            <li key={ measure }>
              <p data-testid={ `${index}-ingredient-name-and-measure` }>
                { measure[1] }
              </p>
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{ strInstructions }</p>
        <Recomendations data={ recomendation } />
        <RecipeButton path={ pathname } ingredients={ ingredients } />
      </div>
    );
  }
}

BebidasDetails.propTypes = {
  data: PropTypes.arrayOf({}).isRequired,
  recomendation: PropTypes.arrayOf([]).isRequired,
};

export default BebidasDetails;
