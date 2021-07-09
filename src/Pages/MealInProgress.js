import React, { useState, useEffect } from 'react';
import RenderIngredients from '../util/mealDetailsComponents/renderIngredients';
import RenderInstructions from '../util/mealDetailsComponents/renderInstructions';
import RenderRecipeImg from '../util/mealDetailsComponents/renderRecipeImg';

export default function MealInProgress() {
  const id = window.location.href.split('/')[4];
  const [data, setData] = useState();

  useEffect(() => {
    const mealDrinks = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const { meals } = await fetch(url).then((r) => r.json());
      setData(meals);
    };
    mealDrinks();
  }, [id]);

  const renderInProgressRecipe = () => {
    if (data && data.length > 0) {
      const ingredients = [];
      const measure = [];
      const array = Object.entries(data[0]);
      array.forEach((item) => {
        if (item[0].includes('strIngredient') && item[1] !== null) {
          ingredients.push(item[1]);
        }
        if (item[0].includes('strMeasure')) {
          measure.push(item[1]);
        }
      });
      console.log(data);
      const { strMealThumb, strMeal, strCategory, strInstructions } = data[0];

      return (
        <div>
          {RenderRecipeImg(strMealThumb)}
          <div>
            <h2>{strMeal}</h2>
            <h3>{strCategory}</h3>
          </div>
          <h2>Ingredients</h2>
          {RenderIngredients(ingredients, measure)}
          <h2>Instructions</h2>
          {RenderInstructions(strInstructions)}
        </div>
      );
    }
  };

  return (
    <div>
      {renderInProgressRecipe()}
    </div>
  );
}
