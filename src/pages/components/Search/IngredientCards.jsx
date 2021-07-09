import React from 'react';
import { useHistory } from 'react-router';
import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setDrinkIngredient } from '../../../actions/drinks';
import { setMealIngredient } from '../../../actions/meals';

function IngredientCards(props) {
  const { ingredients, type } = props;
  const history = useHistory();

  const numberOfCards = 12;
  const dispatch = useDispatch();

  const ingredientFilter = async (ingredient) => {
    if (type === 'drinks') {
      await dispatch(setDrinkIngredient(ingredient.strIngredient1));
      history.push('/bebidas');
    }
    if (type === 'meals') {
      await dispatch(setMealIngredient(ingredient.strIngredient));
      history.push('/comidas');
    }
  };

  return (
    ingredients.slice(0, numberOfCards).map(
      (ingredient, index) => (
        <Col
          key={ ingredient.strIngredient || ingredient.strIngredient1 }
          data-testid={ `${index}-ingredient-card` }
        >
          <button
            type="button"
            onClick={ () => ingredientFilter(ingredient) }
          >
            <img
              src={ type === 'meals' ? `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png`
                : `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
              alt={ ingredient.strIngredient || ingredient.strIngredient1 }
              data-testid={ `${index}-card-img` }
            />
            <h2
              data-testid={ `${index}-card-name` }
            >
              { ingredient.strIngredient || ingredient.strIngredient1 }
            </h2>
          </button>
        </Col>
      ),
    )
  );
}

export default IngredientCards;
