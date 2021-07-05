import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextBebidas from '../provider/ContextBebida';
import { filterCategoriaBebidas } from '../services/apisCategories';
import { cocktailsAPI } from '../services/apisMealsAndCocktails';

function Bebidas() {
  const { data, categoria, setData, texto } = useContext(ContextBebidas);

  const getApis = async () => {
    const apiDrinks = await filterCategoriaBebidas(texto);
    if (apiDrinks !== null && apiDrinks !== undefined) {
      return setData(apiDrinks);
    }
  };

  const fetchapi = async () => {
    const bebidas = await cocktailsAPI();
    setData(bebidas);
  };

  useEffect(() => {
    if (texto === 'All') {
      fetchapi();
    } else if (texto !== '') {
      getApis();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texto]);

  const drinks = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to={ `/bebidas/${item.idDrink}` }>
          <Card
            key={ item.idDrink }
            // style={ { width: '8rem' } }
            data-testid={ `${index}-recipe-card` }
            className="shadow m-1 rounded"
          >
            <Card.Img
              variant="top"
              src={ item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ item.srtDrink }
            />
            <Card.Body>
              <Card.Title data-testid={ `${index}-card-name` }>
                { item.strDrink }
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
      <Header title="Bebidas" />
      <Categorias param={ categoria } />
      <div className="pb-5">
        <div className="d-flex w-75 flex-wrap mx-auto justify-content-center pb-4">
          { drinks() }
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Bebidas;
