import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

import ContextComidas from '../provider/ContextComida';

import getAreas from '../services/apisArea';
import { mealsAPI } from '../services/apisMealsAndCocktails';

function ExplorarComidasArea() {
  const [areas, setAreas] = useState('');
  const [acctualyFood, setAcctualyFood] = useState([]);
  // const [filterArea, setFilterArea] = useState('');

  const { data, setData } = useContext(ContextComidas);

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    setData(comidas);
    setAcctualyFood(comidas);
  };

  useEffect(() => {
    setData([]);
    async function fetchAreas() {
      const areasFetched = await getAreas();

      setAreas(areasFetched);
    }

    fetchapi();
    fetchAreas();
  }, []);

  const handleChange = (event) => {
    const { target: { value } } = event;
    console.log('Mudança', value);
    // setFilterArea(value);
    setAcctualyFood(data.filter((meal) => meal.strArea === value));
    console.log('Entrou aqui!');
  };

  const areasCard = () => {
    // const filterByArea = data.filter((meal) => meal.strArea === filterArea);
    // console.log('Filtro by Area', filterByArea);
    // console.log(target.value);
    console.log('Teste de', acctualyFood);

    return acctualyFood.map((item, index) => {
      const magicNumber = 12;
      if (index < magicNumber) {
        return (
          <Link to="/comidas" key={ index }>
            <Card
              key={ item.strArea }
              style={ { width: '8rem' } }
              data-testid={ `${index}-recipe-card` }
              className="shadow m-1 rounded"
              // onClick={ handleClick }
            >
              <Card.Img
                variant="top"
                data-testid={ `${index}-card-img` }
                alt={ item.strMeal }
                src={ item.strMealThumb }
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
      return null;
    });
  };

  // console.log('Teste data', data);
  // console.log('Teste de', acctualyFood);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        { areas !== '' && areas !== undefined && areas.meals !== undefined
          ? areas.meals
            .map(
              (area, index) => (
                <option
                  key={ index }
                  value={ area.strArea }
                  data-testid={ `${area.strArea}-option` }
                >
                  { area.strArea }
                </option>
              ),
            )
          : null }
      </select>
      { acctualyFood !== [] && areas !== undefined && areas.meals !== undefined ? areasCard() : null }
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
