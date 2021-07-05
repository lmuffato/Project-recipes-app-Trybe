import React, { useContext, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto]);

  const foods = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to={ `/comidas/${item.idMeal}` }>
          <Card
            key={ item.idMeal }
            // style={ { width: '8rem' } }
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
        </Link>
      );
    }
    return '';
  });

  if (data.length < 1) return <h1>Loading...</h1>;

  return (
    <div>
      <Header title="Comidas" />
      <Categorias param={ categoria } />
      <div className="pb-5">
        <div className="d-flex w-75 flex-wrap mx-auto justify-content-center pb-4">
          { foods() }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Comidas;
