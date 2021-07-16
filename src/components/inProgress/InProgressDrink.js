import React, { useContext, useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import DrinkShareAndFavorite from '../DrinkShareAndFavorite';
import { getIngredients, getMeasures, getDrinksById } from '../../services/getDrinks';
import Context from '../../context/Context';
import './progress.css';

export default function InProgressDrink() {
  const { setInProgressDrinksId } = useContext(Context);
  const [drinksId, setDrinksId] = useState([]);
  const [drinksIngredientsId, setDrinksIngredientsId] = useState([]);
  const [drinksMeasuresId, setDrinksMeasuresId] = useState([]);
  const [checkIngredients, setCheckIngredients] = useState([]);
  const match = useRouteMatch();
  const { params: { id } } = match;
  const history = useHistory();

  function handleChange({ target }) {
    setCheckIngredients(target.value);
  }

  useEffect(() => {
    getDrinksById(id)
      .then((drinks) => {
        setDrinksId(drinks);
        setInProgressDrinksId(drinks);
        const ingredients = getIngredients(drinks[0]);
        const measures = getMeasures(drinks[0]);
        setDrinksIngredientsId(ingredients);
        setDrinksMeasuresId(measures);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  console.log(drinksMeasuresId);
  console.log('click', checkIngredients);
  console.log('length aqui', checkIngredients.length);
  return (
    <div>
      { drinksId.map((drink, index) => {
        const {
          strDrinkThumb,
          strDrink,
          strAlcoholic,
          strInstructions,
        } = drink;
        return (
          <div key={ index }>
            <img
              width="100%"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ ` imagem da ${strDrink} ` }
            />
            <h1 data-testid="recipe-title">{ strDrink }</h1>
            <DrinkShareAndFavorite />
            <p data-testid="recipe-category">{ strAlcoholic }</p>
            <ul>
              { drinksIngredientsId.map((ingredient, measurePos) => (
                <div key={ measurePos }>
                  <label
                    htmlFor={ ingredient }
                    data-testid={ ` ${measurePos}-ingredient-step ` }
                  >
                    <input
                      onChange={ (event) => handleChange(event) }
                      id={ ingredient }
                      type="checkbox"
                      name={ ingredient }
                    />
                    { `${ingredient} ${drinksMeasuresId[measurePos] || ' '}` }
                  </label>
                </div>
              )) }
            </ul>
            <p data-testid="instructions">{ strInstructions }</p>
            <button
              onClick={ () => history.push('/receitas-feitas') }
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita
            </button>
          </div>
        );
      }) }
    </div>
  );
}
