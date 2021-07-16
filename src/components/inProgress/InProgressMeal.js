import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import Context from '../../context/Context';
import { getMealsById, getIngredients, getMeasures } from '../../services/getMeals';
import MealShareAndFavorite from '../MealShareAndFavorite';
import './progress.css';

export default function InProgressMeal() {
  const { setInProgressMealsId } = useContext(Context);
  const [mealsId, setMealsId] = useState([]);
  const [mealsIngredientsId, setMealsIngredientsId] = useState([]);
  const [mealsMeasuresId, setMealsMeasuresId] = useState([]);
  const match = useRouteMatch();
  const { params: { id } } = match;
  const history = useHistory();
  useEffect(() => {
    getMealsById(id)
      .then((meals) => {
        setMealsId(meals);
        setInProgressMealsId(meals);
        const ingredients = getIngredients(meals[0]);
        const measures = getMeasures(meals[0]);
        setMealsIngredientsId(ingredients);
        setMealsMeasuresId(measures);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { mealsId.map((meal, index) => {
        const {
          strMeal,
          strMealThumb,
          strCategory,
          strInstructions,
        } = meal;
        return (
          <div key={ index }>
            <img
              width="100%"
              data-testid="recipe-photo"
              src={ strMealThumb }
              alt={ ` imagem da ${strMeal} ` }
            />
            <h1 data-testid="recipe-title">{ strMeal }</h1>
            <MealShareAndFavorite />
            <p data-testid="recipe-category">{ strCategory }</p>
            <ul>
              { mealsIngredientsId.map((ingredient, measurePos) => (
                <div key={ measurePos }>
                  <label
                    htmlFor={ ingredient }
                    data-testid={ ` ${measurePos}-ingredient-step ` }
                  >
                    <input
                      className="input"
                      id={ ingredient }
                      type="checkbox"
                      name={ ingredient }
                    />
                    {
                      mealsIngredientsId !== null
                        ? `${ingredient} ${mealsMeasuresId[measurePos] || ' '}`
                        : undefined
                    }
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
