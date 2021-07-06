// Foods
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Context from '../../../context/Context';

function CardsFilterRecipes() {
  const { filterFoods, clickRecipeFood } = useContext(Context);
  const showFilter = () => {
    const lengthFoods = 12;
    const recipes = filterFoods.slice(0, lengthFoods);
    return (
      <div className="cards-foods">
        {recipes.map((recipe, index) => (
          // Código fonte da biblioteca Bootstrap
          <Link key={ index } to={ `comidas/${recipe.idMeal}` }>
            <Card
              onClick={ () => clickRecipeFood(recipe.idMeal) }
              style={ { width: '10rem' } }
              data-testid={ `${index}-recipe-card` }
              key={ index }
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
          </Link>
        ))}
      </div>
    );
  };
  return (
    <>
      {showFilter()}
    </>
  );
}

export default CardsFilterRecipes;
