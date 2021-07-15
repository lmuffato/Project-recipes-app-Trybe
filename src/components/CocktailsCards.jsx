import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import CocktailsContext from '../context/CocktailsContext';

export default function CocktailsCards() {
  const { cocktails, setCurrCategoryId } = useContext(CocktailsContext);
  const { drinks } = cocktails;
  const end = 12;
  const drinksArray = drinks ? drinks.slice(0, end) : [];

  return (
    <div className="cardsMainRecipes">
      {drinksArray.length > 0
      && drinksArray.map((recipe, index) => (
        <Card
          className="cardRecipe"
          onClick={ async () => setCurrCategoryId(recipe.idDrink) }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            className="cardRecipeImg"
            variant="top"
            src={ recipe.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt="recipe"
          />
          <p data-testid={ `${index}-card-name` }>{recipe.strDrink}</p>
        </Card>
      ))}
    </div>
  );
}
