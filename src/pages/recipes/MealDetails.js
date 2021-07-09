import React, { useEffect, useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { getMealsById, getIngredients, getMeasures } from '../../services/getMeals';

function MealDetails() {
  const [mealsFromId, setMealsFromId] = useState([]);
  const [ingredientsId, setIngredientsId] = useState([]);
  const [measuresId, setMeasuresId] = useState([]);
  const match = useRouteMatch();

  useEffect(() => {
    const { params: { id } } = match;
    getMealsById(id)
      .then((meals) => {
        setMealsFromId(meals);
        const ingredients = getIngredients(meals[0]);
        const measures = getMeasures(meals[0]);
        setIngredientsId(ingredients);
        setMeasuresId(measures);
      });
  }, []);

  const renderDetail = () => (
    mealsFromId.map((info, index) => {
      const {
        strMealThumb,
        strMeal,
        strCategory,
        strInstructions,
        strYoutube,
      } = info;
      return (
        <div key={ index }>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt="recipe"
            width="300"
          />
          <h2 data-testid="recipe-title">{ strMeal }</h2>
          <button type="button" onClick="">
            <img src="" alt="share button" data-testid="share-btn" />
          </button>
          <button type="button" onClick="">
            <img src="" alt="favorite button" data-testid="favorite-btn" />
          </button>
          <p data-testid="recipe-category">{ strCategory }</p>
          <ul>
            Ingredientes
            { ingredientsId.map((ingredient) => {
              measuresId.map((measure) => (
                <li key={ ingredient }>
                  { ingredient }
                  {' '}
                  { measure }
                </li>
              ));
            }) }
          </ul>
          <h2>Instruções</h2>
          <p data-testid="instructions">{ strInstructions }</p>
          <iframe title="recipe-video" src={ strYoutube } width="355" />
          <ul><li data-testid={ `${index}-recomendation-card` }>teste</li></ul>
          <button
            data-testid="start-recipe-btn"
            type="button"
          >
            Iniciar Receita
          </button>
        </div>
      );
    })
  );
  console.log('meals aqui', mealsFromId);
  console.log(ingredientsId);
  console.log(measuresId);
  return (
    <div>
      { renderDetail() }
    </div>
  );
}

export default MealDetails;
