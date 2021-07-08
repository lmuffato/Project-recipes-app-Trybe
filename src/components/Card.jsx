import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import ContextBebidas from '../provider/ContextBebida';
import ContextComidas from '../provider/ContextComida';

function Cards({ param }) {
  const { data: dataDrink } = useContext(ContextBebidas);
  const { data: datafood } = useContext(ContextComidas);

  const comidas = () => datafood.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to={ `/${param}/${item.idMeal}` } key={ index }>
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
              alt={ item.strMeal }
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

  const bebidas = () => dataDrink.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Link to={ `/${param}/${item.idDrink}` } key={ index }>
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

  if (dataDrink === undefined || datafood === undefined) return <h1>Loading...</h1>;

  return (
    param === 'bebidas' ? bebidas() : comidas()
  );
}

export default Cards;
