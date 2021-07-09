import { arrayOf, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

function Ingredients(props) {
  const [ingredientList, setIngredientList] = useState('');
  const { recipe } = props;
  console.log(recipe);
  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((key) => key.includes('Ingredient'));
  const measures = recipeKeys.filter((key) => key.includes('Measure'));
  useEffect(() => {
    const itens = ingredients
      .map((ingredient, index) => [recipe[measures[index]], recipe[ingredient]]);
    const itensFiltered = itens.filter((item) => item[1]);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let ingredientChecks = itensFiltered.map((item) => [item[1], false]);
    if (recipe.idMeal && inProgress && inProgress.meals.idMeal) {
      ingredientChecks = inProgress.meals.idMeal;
    } else if (recipe.idDrink && inProgress && inProgress.cocktails.idDrink) {
      ingredientChecks = inProgress.cocktails.idDrink;
    }
    if (!inProgress) {
      const meals = {};
      const cocktails = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify({ meals, cocktails }));
    } else if (!inProgress.meals) {
      inProgress.meals = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      inProgress.cocktails = {};
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
    setIngredientList(ingredientChecks);
  }, []);

  const handleChange = (index) => {
    ingredientList[index][1] = !ingredientList[index][1];
    setIngredientList([...ingredientList]);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const { idMeal } = recipe;
    if (idMeal) {
      inProgress.meals.idMeal = ingredientList;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    } else {
      inProgress.cocktails.idDrink = ingredientList;
      localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
    }
  };

  return (
    <Form>
      <h2>Ingredients</h2>
      { ingredientList ? ingredientList.map((ingredient, index) => (
        <label key={ ingredient[0] } htmlFor={ ingredient[0] }>
          <input
            type="checkbox"
            checked={ ingredient[1] }
            key={ ingredient[0] }
            onChange={ () => handleChange(index) }
            data-testid={ `${index}-ingredient-step` }
          />
          { `${recipe[measures[index]]} ${ingredient[0]}`}
        </label>
      )) : '' }
    </Form>
  );
}

Ingredients.propTypes = {
  ingredients: arrayOf(string),
}.isRequired;

export default Ingredients;
