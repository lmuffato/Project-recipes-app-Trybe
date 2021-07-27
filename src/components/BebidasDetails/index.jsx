import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Recomendations from '../Recomendations';
import ShareButton from '../ShareButton';
import FavoriteButton from '../FavoriteButton';
import RecipeButton from '../RecipeButton';
import getIngredients from '../../services/getIngredients';
import './style.css';

function BebidasDetails({ data, recomendation }) {
  const { pathname } = useLocation();
  const { id } = useParams();
  const { href } = window.location;
  const ingredients = getIngredients(data, 'strIngredient');
  const ingredientsMeasures = getIngredients(data, 'strMeasure');
  const { strDrink, strInstructions, strDrinkThumb,
    strAlcoholic, strCategory } = data;

  return (
    <div className="recipe-details-container">
      <div className="top-recipe-details">
        <img src={ strDrinkThumb } alt="comida" data-testid="recipe-photo" />
        <div className="recipes-buttons-actions">
          <ShareButton data-testid="share-btn" urlCopied={ href } />
          <FavoriteButton data={ data } path={ id } />
        </div>
      </div>
      <h4 data-testid="recipe-title">{ strDrink }</h4>
      <p>{ strCategory }</p>
      {strAlcoholic === 'Alcoholic' ? (
        <p data-testid="recipe-category">Alcoholic</p>
      ) : (
        <br />
      )}
      <ul>
        {Object.values(ingredients).map((ingredient, index) => {
          const measure = Object.values(ingredientsMeasures)[index];
          return (
            <li
              key={ index }
              htmlFor={ ingredient }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${ingredient} ${measure ? `- ${measure}` : ''}`}
            </li>
          );
        })}
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
