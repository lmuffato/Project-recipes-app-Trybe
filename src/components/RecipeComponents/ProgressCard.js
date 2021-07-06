import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ShareBtn from './ShareButton';
import FavBtn from './FavoriteButton';
import RecipeImage from './RecipeImage';
import RecipeTitle from './RecipeTitle';
import RecipeCatg from './RecipeCategory';
import RecipeInst from './RecipeInstructions';

const filterIngredients = (recipeItems) => Object.entries(recipeItems)
  .filter(([name, value]) => name.includes('Ingredient') && value);

const mountObject = (recipe) => {
  if (recipe.meals) {
    const { idMeal, strArea,
      strCategory, strMeal, strMealThumb, strInstructions } = recipe.meals[0];
    return {
      id: idMeal,
      type: 'comida',
      area: strArea,
      category: strCategory || '',
      alcoholicOrNot: '',
      name: strMeal,
      image: strMealThumb,
      instructions: strInstructions,
      ingredients: filterIngredients(recipe.meals[0]),
    };
  }
  const { idDrink,
    strCategory, strAlcoholic, strDrink, strDrinkThumb } = recipe.drinks[0];
  return {
    id: idDrink,
    type: 'bebida',
    area: '',
    category: strCategory || '',
    alcoholicOrNot: strAlcoholic,
    name: strDrink,
    image: strDrinkThumb,
    ingredients: filterIngredients(recipe.drinks[0]),
  };
};

function ProgressCard({ recipe }) {
  const recipeInfo = mountObject(recipe);
  const { meals, drinks } = recipe;
  const { image, name, category, alcoholicOrNot, ingredients, instructions } = recipeInfo;
  const lineThrough = 'line-through';

  useEffect(() => {
    const element = document.querySelectorAll('.input-ingredients');
    Object.values(element)
      .filter((el) => el.checked)
      .forEach((el) => {
        el.parentNode.style.textDecoration = lineThrough;
      });
  }, []);

  const markAsDone = ({ target }) => {
    const { parentNode, value } = target;
    const lsRecipe = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (parentNode.style.textDecoration !== lineThrough) {
      parentNode.style.textDecoration = lineThrough;
      if (meals) {
        const { meals: food, cocktails } = lsRecipe;
        const mealsId = meals[0].idMeal;
        Object.entries(lsRecipe.meals).forEach(([id, val]) => {
          if (id === mealsId) {
            const object = { meals: { ...food,
              [mealsId]: [...val, Number.parseInt(value, 10)] },
            cocktails: { ...cocktails } };
            localStorage.setItem('inProgressRecipes', JSON.stringify(object));
          }
        });
      } else {
        const { meals: food, cocktails } = lsRecipe;
        const drinksId = drinks[0].idDrink;
        Object.entries(lsRecipe.cocktails).forEach(([id, val]) => {
          if (id === drinksId) {
            const object = { meals: { ...food },
              cocktails: { ...cocktails,
                [drinksId]: [...val, Number.parseInt(value, 10)] } };
            localStorage.setItem('inProgressRecipes', JSON.stringify(object));
          }
        });
      }
    } else {
      parentNode.style.textDecoration = 'none';
    }
  };

  const isChecked = (items, key) => items[1].filter((n) => {
    if (n === key) {
      return 'teste';
    }
    return false;
  });

  const markedItems = () => {
    const lsItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (meals) {
      const { meals: food } = lsItems;
      const lsIngredients = Object.entries(food)
        .find(([i]) => i === meals[0].idMeal);
      return lsIngredients;
    }
    const { cocktails } = lsItems;
    const lsIngredients = Object.entries(cocktails)
      .find(([i]) => i === drinks[0].idDrink);
    return lsIngredients;
  };

  const listIngredients = (recipeIngredients) => {
    let lsItems = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (meals) {
      if (!lsItems) {
        lsItems = { meals: { [meals[0].idMeal]: [] }, cocktails: {} };
      }
    } else if (!lsItems) {
      lsItems = { meals: {}, cocktails: { [drinks[0].idDrink]: [] } };
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(lsItems));
    return (
      <ol className="ol-ingredients">
        {recipeIngredients.map((ingredient, key) => (
          <li className="li-ingredients" key={ key }>
            <label
              className="lbl-ingredients"
              htmlFor={ `ingredient${key}` }
              data-testid={ `${key}-ingredient-step` }
            >
              {ingredient[1]}
              <input
                className="input-ingredients"
                id={ `ingredient${key}` }
                type="checkbox"
                value={ key + 1 }
                onClick={ markAsDone }
                defaultChecked={ isChecked(markedItems(), key + 1)[0] }
              />
            </label>
          </li>))}
      </ol>
    );
  };
  return (
    <div className="recipe_details">
      <RecipeImage origin={ image } />
      <RecipeTitle title={ name } />
      <ShareBtn />
      <FavBtn info={ recipeInfo } />
      <RecipeCatg category={ `${category} ${alcoholicOrNot}` } />
      <h3>Ingredientes</h3>
      {listIngredients(ingredients)}
      <h3>Instruções</h3>
      <RecipeInst instructions={ instructions } />
      <button
        data-testid="finish-recipe-btn"
        type="button"
        disabled
      >
        Finalizar Receita

      </button>
    </div>
  );
}

ProgressCard.propTypes = {
  recipe: PropTypes.objectOf(PropTypes.any),
}.isRequired;
export default ProgressCard;
