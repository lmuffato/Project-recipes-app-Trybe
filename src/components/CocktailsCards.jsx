import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import CocktailsContext from '../context/CocktailsContext';

export default function CocktailsCards() {
  const { cocktails } = useContext(CocktailsContext);
  const { drinks } = cocktails;
  const end = 12;
  const drinksArray = drinks ? drinks.slice(0, end) : [];

  return (
    <div className="cards-container">
      {drinksArray.length > 0
      && drinksArray.map((recipe, index) => (
        <Card
          style={ { width: '18rem' } }
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <Card.Img
            variant="top"
            src={ recipe.strDrinkThumb }
            data-testid={ `${index}-card-img` }
            alt={ recipe.strImageAttribution }
          />
          <Card.Title data-testid={ `${index}-card-name` }>{recipe.strDrink}</Card.Title>
        </Card>
      ))}
    </div>
  );
}
