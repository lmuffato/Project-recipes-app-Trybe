import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import MealsContext from '../context/MealsContext';

export default function MealsCards() {
  const { mealsObject, setCurrCategoryId } = useContext(MealsContext);
  const { meals } = mealsObject;
  const end = 12;
  const recipesArray = meals ? meals.slice(0, end) : [];
  return (
    <div className="cardsMainRecipes">
      {recipesArray.length > 0
      && recipesArray.map((recipe, index) => (
        <Card
          className="cardRecipe"
          onClick={ () => setCurrCategoryId(recipe.idMeal) }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            className="cardRecipeImg"
            variant="top"
            src={ recipe.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="recipe"
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strMeal}</p>
        </Card>
      ))}
    </div>
  );
}
