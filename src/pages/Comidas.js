import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextComidas from '../provider/ContextComida';

function Comidas() {
  const { data, categoria } = useContext(ContextComidas);

  const foods = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Card
          key={ item.idMeal }
          style={ { width: '10rem' } }
          data-testid={ `${index}-recipe-card` }
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
      <div>
        { foods() }
      </div>
    </div>
  );
}

export default Comidas;
