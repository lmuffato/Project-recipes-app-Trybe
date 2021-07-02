import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import MealsContext from '../context/MealsContext';

export default function MealsCards() {
  const { mealsObject } = useContext(MealsContext);
  const { meals } = mealsObject;
  const end = 12;
  const recipesArray = meals ? meals.slice(0, end) : [];

  return (
    <div>
      {recipesArray.length > 1
      && recipesArray.map((recipe, index) => (
        <Card
          style={ { width: '18rem' } }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            variant="top"
            src={ recipe.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt="recipe"
          />
          <h3 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h3>
        </Card>
      ))}
    </div>
  );
}
