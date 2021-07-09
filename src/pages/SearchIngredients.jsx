import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import IngredientCards from './components/Search/IngredientCards';

function SearchIngredients() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const type = pathname.includes('comidas') ? 'meals' : 'drinks';
  const [ingredientsList, setIngredientsList] = useState([]);

  useEffect(() => {
    const fetchIngredients = async () => {
      if (type === 'meals') {
        const endpoint = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';
        const { meals } = await (await fetch(endpoint)).json();
        setIngredientsList(meals);
      }
      if (type === 'drinks') {
        const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
        const { drinks } = await (await fetch(endpoint)).json();
        setIngredientsList(drinks);
      }
    };
    fetchIngredients();
  }, []); // eslint-disable-line

  return (
    <>
      <Header type="search-ingredients" />
      <Container>
        <Row>
          <IngredientCards ingredients={ ingredientsList } type={ type } />
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default SearchIngredients;
