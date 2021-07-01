import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { mealsAPI } from '../services/apisMealsAndCocktails';

function Comidas() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchapi = async () => {
      const xablau = await mealsAPI();
      setData(xablau);
      return xablau;
    };
    fetchapi();
  }, []);

  const foods = () => data.map((item, index) => {
    const magicNumber = 12;
    if (index < magicNumber) {
      return (
        <Card style={ { width: '10rem' } } data-testid={ `${index}-recipe-card` }>
          <Card.Img
            variant="top"
            src={ item.strMealThumb }
            data-testid={ `${index}-card-img` }
          />
          <Card.Body>
            <Card.Title data-testid={ `${index}-card-name` }>{ item.strMeal }</Card.Title>
          </Card.Body>
        </Card>
      );
    }
    return '';
  });

  if (data.length < 1) return <h1>Loading...</h1>;
  return (
    <div>
      <h1>Comidas</h1>
      <div>
        { foods() }
      </div>
    </div>
  );
}

export default Comidas;
