import React, { useEffect } from 'react';
import { head, isEmpty, isString, zip } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DRINKS_BY_ID_ENDPOINT } from '../services/drinks';
import { ALL_MEALS_ENDPOINT } from '../services/meals';
import { getDrinkDetailsAPIThunk } from '../redux/actions/drinksAction';
import { getFoodRecipesAPIThunk } from '../redux/actions/mealsAction';
import Recipe from '../components/Recipe';
import Loading from '../components/Loading';

function createList(object = {}) {
  const entries = Object.entries(object);
  const ingredients = entries
    .filter(([key]) => key.includes('strIngredient'))
    .filter(([, value]) => isString(value) && !isEmpty(value))
    .map(([, value]) => value);
  const measurements = entries
    .filter(([key]) => key.includes('strMeasure'))
    .filter(([, value]) => isString(value) && !isEmpty(value))
    .map(([, value]) => value);
  return zip(ingredients, measurements);
}
function BebidasDetalhes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDrinkDetailsAPIThunk(DRINKS_BY_ID_ENDPOINT(id)));
    dispatch(getFoodRecipesAPIThunk(ALL_MEALS_ENDPOINT));
  }, [dispatch, id]);
  const drink = useSelector((state) => head(state.drinks.drinkDetails));
  const loading = useSelector((state) => state.loading.loadingRecipes);
  const meals = useSelector((state) => state.meals.recipes);

  const { strDrink, strAlcoholic, strInstructions,
    strDrinkThumb } = drink || {};
  const ingredients = createList(drink);
  return (
    loading || isEmpty(drink) || isEmpty(meals) ? <Loading />
      : (
        <section>
          <Recipe.Image url={ strDrinkThumb } />
          <div>
            <Recipe.Title title={ strDrink } />
            <Recipe.Category category={ strAlcoholic } />
            <Recipe.Share type="bebidas" />
            <Recipe.FavoriteDrink />
          </div>
          <Recipe.Ingredients list={ ingredients } />
          <Recipe.Instructions text={ strInstructions } />
          <Recipe.Recomendations list={ meals } />
          <Recipe.Start type="bebidas" />
        </section>
      )
  );
}

export default BebidasDetalhes;
