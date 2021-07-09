import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';

import ContextComidas from '../provider/ContextComida';

import { getAreas, getFoodsByArea } from '../services/apisArea';
import { mealsAPI } from '../services/apisMealsAndCocktails';

function ExplorarComidasArea() {
  const [areas, setAreas] = useState('');
  const [acctualyFood, setAcctualyFood] = useState([]);
  const [filterArea, setFilterArea] = useState('All');

  const { data, setData } = useContext(ContextComidas);

  const fetchapi = async () => {
    const comidas = await mealsAPI();
    setData(comidas);
    // setAcctualyFood(comidas);
  };

  // const fetchByArea = async (area) => {
  //   const filterFoods = await getFoodsByArea(area);
  //   console.log('Tentando', filterFoods.meals);
  //   setAcctualyFood(filterFoods);
  // };

  useEffect(() => {
    setData([]);
    async function fetchAreas() {
      const areasFetched = await getAreas();

      setAreas(areasFetched);
    }

    fetchapi();
    fetchAreas();
  }, []);

  useEffect(() => {
    if (filterArea !== 'All') {
      const fetchByArea = async (area) => {
        const filterFoods = await getFoodsByArea(area);
        console.log('Tentando', filterFoods.meals);
        setAcctualyFood(filterFoods.meals);
      };

      fetchByArea(filterArea);
    } else {
      setAcctualyFood(data);
    }
  }, [filterArea, data]);

  const handleChange = (event) => {
    const { target: { value } } = event;

    setFilterArea(value);
  };

  const areasCard = () => {
    if (filterArea !== undefined) {
      console.log('Render do All');
      return acctualyFood.map((item, index) => {
        const magicNumber = 12;
        if (index < magicNumber) {
          return (
            <Link to={ `/comidas/${item.idMeal}` } key={ index }>
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
    }
    console.log('Diferente de All');
    // return acctualyFood.map((item, index) => (
    //   <Link to={ `/comidas/${item.idMeal}` } key={ index }>
    //     <Card
    //       key={ item.strArea }
    //       style={ { width: '8rem' } }
    //       data-testid={ `${index}-recipe-card` }
    //       className="shadow m-1 rounded"
    //       // onClick={ handleClick }
    //     >
    //       <Card.Img
    //         variant="top"
    //         data-testid={ `${index}-card-img` }
    //         alt={ item.strMeal }
    //         src={ item.strMealThumb }
    //       />
    //       <Card.Body>
    //         <Card.Title data-testid={ `${index}-card-name` }>
    //           { item.strMeal }
    //         </Card.Title>
    //       </Card.Body>
    //     </Card>
    //   </Link>
    // ));
  };

  // console.log('Teste data', data);
  console.log('Teste de', acctualyFood);

  return (
    <div>
      <Header title="Explorar Origem" />
      <select data-testid="explore-by-area-dropdown" onChange={ handleChange }>
        <option
          key="All"
          value="All"
          data-testid="All-option"
        >
          All
        </option>
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
      { acctualyFood !== [] && areas !== undefined && areas.meals !== undefined
        ? areasCard() : null }
      <Footer />
    </div>
  );
}

export default ExplorarComidasArea;
