import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';

function SearchMealOrDrink() {
  const { location: { pathname } } = useHistory();
  const SEARCH_MEALS = 'search-meals';
  const SEARCH_DRINKS = 'search-drinks';
  const type = pathname.includes('comidas') ? SEARCH_MEALS : SEARCH_DRINKS;
  const [randomRecipe, setRandomRecipe] = useState('');

  useEffect(() => {
    const fetchId = async () => {
      if (type === SEARCH_MEALS) {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/random.php';
        const { meals } = await (await fetch(endpoint)).json();
        setRandomRecipe(meals[0].idMeal);
      }
      if (type === SEARCH_DRINKS) {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
        const { drinks } = await (await fetch(endpoint)).json();
        setRandomRecipe(drinks[0].idDrink);
      }
    };
    fetchId();
  }, []); // eslint-disable-line

  return (
    <>
      <Header type={ type } />
      <Container>
        <Row>
          <Link
            to={ type === SEARCH_MEALS
              ? '/explorar/comidas/ingredientes'
              : '/explorar/bebidas/ingredientes' }
          >
            <button
              type="button"
              data-testid="explore-by-ingredient"
              className="explore-btns"
            >
              Por Ingredientes
            </button>
          </Link>
        </Row>
        { type === SEARCH_DRINKS ? null
          : (
            <Row>
              <Link to="/explorar/comidas/area">
                <button
                  type="button"
                  data-testid="explore-by-area"
                  className="explore-btns"
                >
                  Por Local de Origem
                </button>
              </Link>
            </Row>) }
        <Row>
          <Link
            to={
              type === 'search-meals'
                ? `/comidas/${randomRecipe}`
                : `/bebidas/${randomRecipe}`
            }
          >
            <button
              type="button"
              data-testid="explore-surprise"
              className="explore-btns"
            >
              Me Surpreenda!
            </button>
          </Link>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SearchMealOrDrink;
