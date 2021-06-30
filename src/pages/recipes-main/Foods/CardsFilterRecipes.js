import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import Context from '../../../context/Context';

function CardsFilterRecipes() {
  const { filterFoods } = useContext(Context);
  const showFilter = () => {
    // if (filterFoods.length === 1) {
    //   return console.log('hum');
    // }
    const lengthFoods = 12;
    const recipes = filterFoods.slice(0, lengthFoods);
    return (
      <div>
        {recipes.map((recipe, index) => (
          // Código fonte da biblioteca Bootstrap
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
  };
  return (
    <>
      <p>Filtros</p>
      {showFilter()}
    </>
  );
}

export default CardsFilterRecipes;
