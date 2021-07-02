import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextComidas from '../provider/ContextComida';
import Footer from '../components/Footer';
import { filterCategoriaComidas } from '../services/apisCategories';
import { mealsAPI } from '../services/apisMealsAndCocktails';

function Comidas() {
  const { data, categoria, setData, texto } = useContext(ContextComidas);

  const getApis = async () => {
    const apiFoods = await filterCategoriaComidas(texto);
    if (apiFoods !== null && apiFoods !== undefined) {
      return setData(apiFoods);
    }
  };

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    setData(comidas);
  };

  useEffect(() => {
    if (texto === 'All') {
      fetchapi();
    } else if (texto !== '') {
      getApis();
    }
  }, [texto]);

  const foods = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Card
          key={ item.idMeal }
          style={ { width: '10rem' } }
          data-testid={ `${index}-recipe-card` }
          className="shadow m-1 rounded"
        >
          <Card.Img
            variant="top"
            src={ item.strMealThumb }
            data-testid={ `${index}-card-img` }
            alt={ item.srtMeal }
          />
          <Card.Body>
            <Card.Title data-testid={ `${index}-card-name` }>
              { item.strMeal }
            </Card.Title>
          </Card.Body>
        </Card>
      );
    }
    return '';
  });

  if (data.length < 1) return <h1>Loading...</h1>;

  return (
    <div>
      <Header title="Comidas" />
      <Categorias param={ categoria } />
      <div className="d-flex w-100 flex-wrap justify-content-center">
        { foods() }
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
