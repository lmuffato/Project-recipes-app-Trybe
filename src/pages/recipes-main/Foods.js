import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import Context from '../../context/Context';
import './index.css';

function Foods() {
  const { foods } = useContext(Context);
  const lengthFoods = 12;
  const CardsRecipes = () => {
    if (foods !== []) {
      const recipes = foods.slice(0, lengthFoods);
      return (
        <div className="cards-foods">
          {recipes.map((recipe, index) => (
            <Card
              key={ index }
              style={ { width: '10rem' } }
              data-testid={ `${index}-recipe-card` }
            >
              <Card.Img
                variant="top"
                src={ recipe.strMealThumb }
                data-testid={ `${index}-card-img` }
              />
              <Card.Body>
                <Card.Title
                  data-testid={ `${index}-card-name` }
                >
                  {recipe.strMeal}
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
      {CardsRecipes()}
      <div>Rodapé</div>
    </>
  );
}

export default Foods;
