import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Footer from '../../../components/Footer';
import HeaderWithSearch from '../../../components/HeaderWithSearch';
import Context from '../../../context/Context';
import '../index.css';
import CardsFilterRecipes from './CardsFilterRecipes';
import FilterDrinks from './FilterDrinks';

function Drinks() {
  const { drinks, showFilter, clickRecipeDrinks } = useContext(Context);
  const lengthDrinks = 12;
  const CardsRecipes = () => {
    if (drinks !== []) {
      const recipes = drinks.slice(0, lengthDrinks);
      return (
        <div className="cards-drinks">
          {recipes.map((recipe, index) => (
            // Cód</Link>igo fonte da biblioteca Bootstrap
            <Link key={ index } to={ `bebidas/${recipe.idDrink}` }>
              <Card
                onClick={ () => clickRecipeDrinks(recipe.idDrink) }
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
            </Link>
          ))}
        </div>
      );
    }
  };
  return (
    <>
      <HeaderWithSearch />
      <FilterDrinks />
      {showFilter ? <CardsFilterRecipes /> : CardsRecipes()}
      <Footer />
    </>
  );
}

export default Drinks;
