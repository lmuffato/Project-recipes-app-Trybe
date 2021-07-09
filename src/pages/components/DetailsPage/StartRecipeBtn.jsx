import React, { useState, useEffect } from 'react';
import { object, string } from 'prop-types';
import { useHistory } from 'react-router-dom';

function StartRecipeBtn(props) {
  const { pathname, recipe, type } = props;
  const history = useHistory();
  const [resumeRecipe, resumeRecipeCheck] = useState(false);

  const startRecipe = () => {
    history.push(`${pathname}/in-progress`);
  };

  // eslint-disable-next-line
  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (!inProgressRecipes) return;
    if (type === 'meals') {
      const { meals } = inProgressRecipes;
      const mealsKeys = Object.keys(meals);
      resumeRecipeCheck(mealsKeys.includes(recipe.idMeal));
    }
    if (type === 'drinks') {
      const { cocktails } = inProgressRecipes;
      const cocktailsKeys = Object.keys(cocktails);
      resumeRecipeCheck(cocktailsKeys.includes(recipe.idDrink));
    }
  });

  return (
    <div>
      <button
        type="button"
        data-testid="start-recipe-btn"
        className="start-recipe-btn"
        onClick={ startRecipe }
      >
        { resumeRecipe ? 'Continuar ' : 'Iniciar ' }
        Receita
      </button>
    </div>
  );
}

StartRecipeBtn.propTypes = {
  pathname: string,
  recipe: object,
}.isRequired;

export default StartRecipeBtn;
