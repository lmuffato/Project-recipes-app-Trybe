import { arrayOf, string } from 'prop-types';
import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

const handleChange = (
  index, ingredientList, setIngredientList, recipe,
) => {
  ingredientList[index][1] = !ingredientList[index][1];
  setIngredientList([...ingredientList]);
  const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const { idMeal, idDrink } = recipe;
  if (idMeal) {
    inProgress.meals[idMeal] = ingredientList;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  } else {
    inProgress.cocktails[idDrink] = ingredientList;
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgress));
  }
};

function Ingredients(props) {
  const [ingredientList, setIngredientList] = useState('');
  const { recipe, inProgressUpdate, setInprogressUpdate } = props;
  const { idMeal, idDrink } = recipe;
  const recipeKeys = Object.keys(recipe);
  const ingredients = recipeKeys.filter((key) => key.includes('Ingredient'));
  const measures = recipeKeys.filter((key) => key.includes('Measure'));
  useEffect(() => {
    const itens = ingredients
      .map((ingredient, index) => [recipe[measures[index]], recipe[ingredient]]);
    const itensFiltered = itens.filter((item) => item[1]);
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let ingredientChecks = itensFiltered.map((item) => [item[1], false]);
    if (recipe.idMeal && inProgress && inProgress.meals[idMeal]) {
      ingredientChecks = inProgress.meals[idMeal];
    } else if (recipe.idDrink && inProgress && inProgress.cocktails[idDrink]) {
      ingredientChecks = inProgress.cocktails[idDrink];
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

  useEffect(() => {
    setInprogressUpdate(!inProgressUpdate);
  }, [ingredientList]); // eslint-disable-line

  return (
    <Container className="inProgress-ingredients-container">
      <h2 className="inProgress-ingredient-title">Ingredients</h2>
      { ingredientList ? ingredientList.map((ingredient, index) => (
        <Row
          key={ ingredient }
          data-testid={ `${index}-ingredient-step` }
          className="inProgress-ingredient-row"
        >
          <label
            key={ ingredient[0] }
            htmlFor={ ingredient[0] }
            className="inProgress-ingredient"
          >
            <input
              type="checkbox"
              className="inProgress-checkbox"
              id={ ingredient[0] }
              checked={ ingredient[1] }
              key={ ingredient[0] }
              onChange={
                () => handleChange(index, ingredientList, setIngredientList, recipe)
              }
              // data-testid={ `${index}-ingredient-step` }
            />
            {!ingredient[1] ? (
              <div className="inProgress-ingredient-item">
                <p>
                  {recipe[measures[index]]}
                </p>
                <p>{ingredient[0]}</p>
              </div>
            )
              : (
                <div className="inProgress-ingredient-item">
                  <p>
                    <s>
                      {recipe[measures[index]]}
                    </s>
                  </p>
                  <p><s>{ingredient[0]}</s></p>
                </div>)}
          </label>
        </Row>
      )) : '' }
    </Container>
  );
}

Ingredients.propTypes = {
  ingredients: arrayOf(string),
}.isRequired;

export default Ingredients;
