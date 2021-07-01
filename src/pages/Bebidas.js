import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import Header from '../components/Header';
import Categorias from '../components/Categorias';
import ContextBebidas from '../provider/ContextBebida';

function Bebidas() {
  const { data, categoria } = useContext(ContextBebidas);

  const drinks = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Card
          key={ item.idDrink }
          style={ { width: '10rem' } }
          data-testid={ `${index}-recipe-card` }
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
      );
    }
    return '';
  });

  if (data.length < 1) return <h1>Loading...</h1>;

  return (
    <div>
      <Header title="Bebidas" />
      <Categorias param={ categoria } />
      <div>
        { drinks() }
      </div>
    </div>
  );
}

export default Bebidas;
