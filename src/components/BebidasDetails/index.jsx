import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Recomendations from '../Recomendations';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import RecipeButton from '../RecipeButton';
import getIngredients from '../../services/getIngredients';

function BebidasDetails({ data, recomendation }) {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { href } = window.location;
  const ingredients = getIngredients(data, 'strIngredient');
  const ingredientsMeasures = getIngredients(data, 'strMeasure');
  const { strDrink, strInstructions, strDrinkThumb,
    strAlcoholic, strCategory } = data;

  return (
    <div>
      <img src={ strDrinkThumb } alt="comida" data-testid="recipe-photo" />
      <h4 data-testid="recipe-title">{ strDrink }</h4>
      <ShareButton data-testid="share-btn" urlCopied={ href } />
      <FavoriteButton data={ data } path={ id } />
      <p>{ strCategory }</p>
      {strAlcoholic === 'Alcoholic' ? (
        <p data-testid="recipe-category">Alcoholic</p>
      ) : (
        <br />
      )}
      <ul>
        { Object.values(ingredients).map((ingredient, index) => (
          <li key={ index }>
            <p data-testid={ `${index}-ingredient-name-and-measure` }>
              { ingredient }
            </p>
          </li>
        ))}
        { Object.values(ingredientsMeasures).map((measure, index) => (
          <li key={ index }>
            <p data-testid={ `${index}-ingredient-name-and-measure` }>
              { measure }
            </p>
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{ strInstructions }</p>
      <Recomendations data={ recomendation } />
      <RecipeButton recipe={ data } path={ pathname } ingredients={ ingredients } />
    </div>
  );
}

BebidasDetails.propTypes = {
  data: PropTypes.shape({}),
  recomendation: PropTypes.arrayOf(PropTypes.shape({})),
}.isRequired;

export default BebidasDetails;
