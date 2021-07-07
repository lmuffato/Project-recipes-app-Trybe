import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setInitialMeals } from '../redux/actions';
import fetchMealsByIngredient from '../helpers/fetchFoodByIngredient';
import '../PagesCss/Ingredients.css';

const Filter = async (dispatch, history, name) => {
  const { meals } = await fetchMealsByIngredient(name);
  dispatch(setInitialMeals(meals));
  history.push('/comidas');
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
          className="ingredients-btn"
          onClick={ () => Filter(dispatch, history, e.strIngredient) }
          key={ index }
        >
          <div data-testid={ `${index}-ingredient-card` }>
            <img
              data-testid={ `${index}-card-img` }
              src={ `https://www.themealdb.com/images/ingredients/${e.strIngredient}-Small.png` }
              alt={ e.strIngredient }
            />
            <span data-testid={ `${index}-card-name` }>{e.strIngredient}</span>
          </div>
        </button>
      ))
    );
  }
}
