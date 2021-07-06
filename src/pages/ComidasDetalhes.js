import React, { useEffect } from 'react';
import { head, isEmpty, zip } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { MEALS_BY_ID_ENDPOINT } from '../services/meals';
import { ALL_DRINKS_ENDPOINT } from '../services/drinks';
import { getFoodDetailsAPIThunk } from '../redux/actions/mealsAction';
import { getDrinkRecipesAPIThunk } from '../redux/actions/drinksAction';
import Recipe from '../components/Recipe';
import Loading from '../components/Loading';

function createList(object = {}) {
  const entries = Object.entries(object);
  const ingredients = entries
    .filter(([key]) => key.includes('strIngredient'))
    .filter(([, value]) => !isEmpty(value))
    .map(([, value]) => value);
  const measurements = entries
    .filter(([key]) => key.includes('strMeasure'))
    .filter(([, value]) => value !== ' ')
    .map(([, value]) => value);
  return zip(ingredients, measurements);
}
function ComidasDetalhes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFoodDetailsAPIThunk(MEALS_BY_ID_ENDPOINT(id)));
    dispatch(getDrinkRecipesAPIThunk(ALL_DRINKS_ENDPOINT));
  }, [dispatch, id]);
  const meal = useSelector((state) => head(state.meals.mealDetails));
  const loading = useSelector((state) => state.loading.loadingRecipes);
  const drinks = useSelector((state) => state.drinks.recipes);

  const { strMeal, strCategory, strInstructions,
    strMealThumb, strYoutube } = meal || {};
  const ingredients = createList(meal);
  return (
    loading || isEmpty(meal) || isEmpty(drinks) ? <Loading />
      : (
        <section>
          <Recipe.Image url={ strMealThumb } />
          <div>
            <Recipe.Title title={ strMeal } />
            <Recipe.Category category={ strCategory } />
            <Recipe.Share />
            <Recipe.FavoriteMeal />
          </div>
          <Recipe.Ingredients list={ ingredients } />
          <Recipe.Instructions text={ strInstructions } />
          <Recipe.Video url={ strYoutube } />
          <Recipe.Recomendations list={ drinks } />
          <Recipe.Start type="comidas" />
        </section>
      )
  );
}

export default ComidasDetalhes;
