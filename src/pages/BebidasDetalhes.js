import React, { useEffect } from 'react';
import { head, isEmpty } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { DRINKS_BY_ID_ENDPOINT } from '../services/drinks';
import { ALL_MEALS_ENDPOINT } from '../services/meals';
import { getDrinkDetailsAPIThunk } from '../redux/actions/drinksAction';
import { getFoodRecipesAPIThunk } from '../redux/actions/mealsAction';
import Recipe from '../components/Recipe';
import Loading from '../components/Loading';
import { createIngredientsList } from '../utils';

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
  const ingredients = createIngredientsList(drink);
  return (
    loading || isEmpty(drink) || isEmpty(meals) ? <Loading />
      : (
        <section>
          <Recipe.Image url={ strDrinkThumb } />
          <div className="header-details">
            <div>
              <Recipe.Title title={ strDrink } />
              <Recipe.Category category={ strAlcoholic } />
            </div>
            <div>
              <Recipe.Share id={ id } type="bebidas" />
              <Recipe.FavoriteDrink />
            </div>
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
