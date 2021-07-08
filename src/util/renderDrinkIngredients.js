import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { requestInitialDrinks } from '../redux/actions';
import fetchDrinksByIngredient from '../helpers/fetchDrinksByIngredient';
import '../PagesCss/Ingredients.css';

const Filter = async (dispat, history, name) => {
  const { drinks } = await fetchDrinksByIngredient(name);
  dispat(requestInitialDrinks(drinks));
  history.push('/bebidas');
};

export default function RenderIngredients(ingredients) {
  const dispatch = useDispatch();
  const history = useHistory();
  const LIMIT = 12;
  if (ingredients) {
    return (
      ingredients.map((e, index) => index < LIMIT && (
        <button
          type="button"
          key={ index }
          className="ingredients-btn"
          onClick={ () => Filter(dispatch, history, e.strIngredient1) }
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.thecocktaildb.com/images/ingredients/${e.strIngredient1}-Small.png` }
              alt={ e.strIngredient1 }
            />
            <span data-testid={ `${index}-card-name` }>{e.strIngredient1}</span>
          </div>
        </button>
      ))
    );
  }
}
