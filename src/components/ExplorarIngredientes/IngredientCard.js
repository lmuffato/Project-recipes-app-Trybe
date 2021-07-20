import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import '../../style/IngredientCard.css';

import FoodContext from '../../contexts/FoodContext';
import DrinkContext from '../../contexts/DrinkContext';

import { fetchFoodsByIngredient } from '../../services/mealAPI';
import { fetchDrinksByIngredient } from '../../services/cocktailAPI';

export default function IngredientCard({ ingredient, type, index }) {
  const ingredientName = ingredient.strIngredient || ingredient.strIngredient1;
  let imageURL;
  if (type === 'comidas') {
    imageURL = `https://www.themealdb.com/images/ingredients/${ingredientName}-Small.png`;
  } else if (type === 'bebidas') {
    imageURL = `https://www.thecocktaildb.com/images/ingredients/${ingredientName}-Small.png`;
  }

  const { setFoods } = useContext(FoodContext);
  const { setDrinks } = useContext(DrinkContext);

  const history = useHistory();

  function handleIngredientClick() {
    if (type === 'comidas') {
      fetchFoodsByIngredient(ingredientName).then((data) => {
        setFoods(data.meals);
      });
    }
    if (type === 'bebidas') {
      fetchDrinksByIngredient(ingredientName).then((data) => {
        setDrinks(data.drinks);
      });
    }
    history.push(`/${type}`);
  }

  return (
    <div className="main-ingredient">
      <button
        type="button"
        data-testid={ `${index}-ingredient-card` }
        onClick={ handleIngredientClick }
        className="ingredient-card-container "
      >
        <img
          src={ imageURL }
          alt={ ingredientName }
          data-testid={ `${index}-card-img` }
        />
        <p data-testid={ `${index}-card-name` }>{ingredientName}</p>
      </button>
    </div>
  );
}

IngredientCard.propTypes = {
  ingredient: PropTypes.shape({
    idIngredient: PropTypes.string,
    strIngredient: PropTypes.string,
    strDescription: PropTypes.string,
    strType: PropTypes.string,
  }),
  type: PropTypes.string,
}.isRequired;
