import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import DetailsHeader from '../components/DetailsHeader';
import IngredientListCheckbox from '../components/RecipesIP/IngredientsListCheckbox';
import DoneRecipesContext from '../contexts/DoneRecipesContext';

import { fetchDrinkByID } from '../services/cocktailAPI';

// PS: This Page contains CSS InLine

export default function DetalhesBebidasIP() {
  const { pathname } = useLocation();
  const drinkId = pathname.split('/')[2];

  const [drink, setDrink] = useState({});
  const [usedIngredients, setUsedIngredients] = useState([]);

  const { doneRecipes, setDoneRecipes } = useContext(DoneRecipesContext);

  function handleCheckIngredient(ev) {
    // adds or removes clicked ingredient from usedIngredients list
    const ingredient = ev.target.value;
    const isUsed = usedIngredients.includes(ingredient);
    if (!isUsed) {
      setUsedIngredients([...usedIngredients, ingredient]);
    } else {
      setUsedIngredients(usedIngredients.filter(((ing) => ing !== ingredient)));
    }
  }

  function allIngredientsChecked() {
    // return true if all ingredients are checked
    const allIngredients = Object.entries(drink).filter(
      (entry) => entry[0].includes('Ingredient'),
    );

    const validIngredients = allIngredients
      .filter((ing) => ing[1])
      .map((ingStr) => ingStr[1]);

    let isEqual = true;

    validIngredients.forEach((ing, index) => {
      if (ing !== usedIngredients[index]) {
        isEqual = false;
      }
    });

    return isEqual;
  }

  const history = useHistory();
  function finishRecipe() {
    const doneRecipesIds = doneRecipes.map(((doceRecipe) => doceRecipe.id));
    const isAlreadyDone = doneRecipesIds.includes(drink.idDrink);

    const now = new Date();
    const dateString = `${now.getDate()}/${now.getMonth()}/${now.getFullYear()}`;

    if (!isAlreadyDone) {
      setDoneRecipes([...doneRecipes, {
        id: drink.idDrink,
        type: 'bebida',
        area: drink.strArea ? drink.strArea : '',
        category: drink.strCategory ? drink.strCategory : '',
        alcoholicOrNot: drink.strAlcoholic,
        name: drink.strDrink,
        image: drink.strDrinkThumb,
        doneDate: `Feita em: ${dateString}`,
        tags: drink.strTags ? [drink.strTags.split(',')] : [],
      }]);
    }
    history.push('/receitas-feitas');
  }

  useEffect(() => {
    // get drink data from API
    fetchDrinkByID(drinkId).then((data) => setDrink(data.drinks[0]));
    // Check if there is data in LS, if not, create it
    if (!localStorage.getItem('inProgressRecipes')) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
  }, [drinkId]);

  useEffect(() => {
    // add ingredients list from LS to usedIngredients
    const inProgressRecipesLS = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let drinksInLS = {};
    if (inProgressRecipesLS) {
      drinksInLS = inProgressRecipesLS.cocktails;
    }

    if (Object.keys(drinksInLS).includes(drinkId)) {
      setUsedIngredients(drinksInLS[drinkId]);
    }
  }, [drinkId]);

  useEffect(() => {
    // save ingredients list to LS
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...inProgressRecipes,
      cocktails: { ...inProgressRecipes.cocktails, [drinkId]: usedIngredients },
    }));
  }, [usedIngredients, drinkId]);

  return (
    <div>
      {drink && (
        <div>
          <DetailsHeader recipe={ drink } isDrink />
          <br />
          <IngredientListCheckbox
            recipe={ drink }
            isDrink
            handleCheckIngredient={ handleCheckIngredient }
            usedIngredients={ usedIngredients }
          />
          <br />

          <p
            style={ { margin: 15 } }
            data-testid="instructions"
          >
            {drink.strInstructions}
          </p>

          <br />

          <button
            className="button is-primary"
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !allIngredientsChecked() }
            onClick={ () => finishRecipe() }
          >
            Finish Recipe
          </button>
          <br />
          <br />
        </div>
      )}
    </div>
  );
}
