import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import Context from '../../../context/Context';
import '../index.css';
import CardsFilterRecipes from './CardsFilterRecipes';
import FilterDrinks from './FilterDrinks';

function Drinks() {
  const { drinks, showFilter } = useContext(Context);
  const lengthDrinks = 12;
  const CardsRecipes = () => {
    if (drinks !== []) {
      const recipes = drinks.slice(0, lengthDrinks);
      return (
        <div className="cards-foods">
          {recipes.map((recipe, index) => (
          // Código fonte da biblioteca Bootstrap
            <Card
              key={ index }
              style={ { width: '10rem' } }
              data-testid={ `${index}-recipe-card` }
            >
              <Card.Img
                variant="top"
                src={ recipe.strDrinkThumb }
                data-testid={ `${index}-card-img` }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  {recipe.strDrink}
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      );
    }
  };
  return (
    <>
      <div>Header</div>
      <FilterDrinks />
      {showFilter ? <CardsFilterRecipes /> : CardsRecipes()}
      <div>Rodapé</div>
    </>
  );
}

export default Drinks;
