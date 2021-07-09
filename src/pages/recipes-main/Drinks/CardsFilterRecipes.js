// Drinks
import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import Context from '../../../context/Context';

function CardsFilterRecipes() {
  const { filterDrinks, clickRecipeDrinks, search } = useContext(Context);
  const showFilter = () => {
    const lengthDrinks = 12;
    const recipes = filterDrinks.slice(0, lengthDrinks);
    return (
      <div className="cards-drinks">
        {recipes.map((recipe, index) => (
          // Código fonte da biblioteca Bootstrap
          <Link key={ index } to={ `bebidas/${recipe.idDrink}` }>
            <Card
              bsPrefix="card"
              className="cards-recipes"
              onClick={ () => clickRecipeDrinks(recipe.idDrink) }
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
          </Link>
        ))}
      </div>
    );
  };

  const showErrorMessage = () => {
    const alert = 'Sinto muito, não encontramos nenhuma receita para esses filtros.';
    global.alert(alert);
    return (
      <div />
    );
  };

  const redirect = () => {
    const id = filterDrinks[0].idDrink;
    return <Redirect to={ `/bebidas/${id}` } />;
  };

  const renderCards = () => {
    if (search && filterDrinks === null) {
      return showErrorMessage();
    } if (search && filterDrinks.length === 1) {
      return redirect();
    } return showFilter();
  };

  return (
    renderCards()
  );
}

export default CardsFilterRecipes;
