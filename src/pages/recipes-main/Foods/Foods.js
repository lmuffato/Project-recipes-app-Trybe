import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import HeaderWithSearch from '../../../components/HeaderWithSearch';
import Context from '../../../context/Context';
import '../index.css';
import CardsFilterRecipes from './CardsFilterRecipes';
import FilterFoods from './FilterFoods';

function Foods() {
  const { foods, showFilter, clickRecipeFood, search } = useContext(Context);
  const lengthFoods = 12;
  const CardsRecipes = () => {
    if (foods !== []) {
      const recipes = foods.slice(0, lengthFoods);
      return (
        <div className="cards-foods">
          {recipes.map((recipe, index) => (
            // Código fonte da biblioteca Bootstrap
            <Link key={ index } to={ `comidas/${recipe.idMeal}` }>
              <Card
                bsPrefix="card"
                className="cards-recipes"
                onClick={ () => clickRecipeFood(recipe.idMeal) }
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
            </Link>
          ))}
        </div>
      );
    }
  };

  const renderFoods = () => {
    if (showFilter === true && search === false) {
      return <CardsFilterRecipes />;
    } if (showFilter === false && search === false) {
      return CardsRecipes();
    } if (showFilter === false && search === true) {
      return CardsRecipes();
    } if (showFilter === true && search === true) {
      return <CardsFilterRecipes />;
    }
  };

  return (
    <>
      <HeaderWithSearch />
      <FilterFoods />
      {renderFoods()}
      <Footer />
    </>
  );
}

export default Foods;
