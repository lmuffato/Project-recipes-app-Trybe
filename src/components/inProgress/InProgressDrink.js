import React, { useContext, useEffect, useState } from 'react';
import Context from '../../context/Context';
import { getIngredients, getMeasures } from '../../services/getDrinks';
import DrinkShareAndFavorite from '../DrinkShareAndFavorite';

export default function InProgressDrink() {
  const { drinksId } = useContext(Context);
  const [ingredients, setIngredients] = useState([]);
  const [measure, setMeasure] = useState([]);

  useEffect(() => {
    const drinkIngredient = getIngredients(drinksId[0]);
    const measureIngredient = getMeasures(drinksId[0]);
    setIngredients(drinkIngredient);
    setMeasure(measureIngredient);
  }, []);

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
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ ` imagem da ${strDrink} ` }
            />
            <h1 data-testid="recipe-title">{ strDrink }</h1>
            <DrinkShareAndFavorite />
            <p>{ strAlcoholic }</p>
            <ul>
              { ingredients.map((ingredient, measurePos) => (
                <li
                  data-testid={ `${index}-ingredient-step` }
                  key={ measurePos }
                >
                  <input
                    type="checkbox"
                    value={ `${ingredient} ${measure[measurePos]}` }
                  />
                </li>
              )) }
            </ul>
            <p data-testid="instructions">{ strInstructions }</p>
          </div>
        );
      }) }
    </div>
  );
}
