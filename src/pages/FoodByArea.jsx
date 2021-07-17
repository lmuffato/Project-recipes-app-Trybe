import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';
import SearchButton from '../components/SearchButton';

export default function FoodByArea() {
  const [mealsByArea, setMealsByArea] = useState([]);
  const [area, setArea] = useState([]);
  const [picked, setSelected] = useState('American');
  const history = useHistory();

  useEffect(() => {
    const fetchRequisitions = async () => {
      const areaResults = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
      const responseApi = await areaResults.json();
      const { meals: mealsArea } = responseApi;
      setArea(mealsArea);
      const americanArea = await fetch('https://www.themealdb.com/api/json/v1/1/filter.php?a=American');
      const responseApiAm = await americanArea.json();
      const { meals } = responseApiAm;
      const index = 12;
      const americanMealArea = meals.slice(0, index);
      setMealsByArea(americanMealArea);
    };
    fetchRequisitions();
  }, []);

  useEffect(() => {
    const asyncFunction = async () => {
      let verify = '';
      if (picked === 'All') {
        verify = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      } else {
        verify = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${picked}`;
      }
      const fetchArea = await fetch(verify);
      const responseArea = await fetchArea.json();
      const { meals } = responseArea;
      const index = 12;
      const fetchArea12 = meals.slice(0, index);
      setMealsByArea(fetchArea12);
    };
    asyncFunction();
  }, [picked]);

  const redirect = (idfood) => {
    history.push(`/comidas/${idfood}`);
  };

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Origem</h1>
        <SearchButton />
      </Header>
      <select
        value={ picked }
        onChange={ (event) => setSelected(event.target.value) }
        name="area"
        data-testid="explore-by-area-dropdown"
      >
        <option value="All" data-testid="All-option">All</option>

        { area.map((el1) => (
          <option
            data-testid={ `${el1.strArea}-option` }
            key={ el1.strArea }
          >
            { el1.strArea }
          </option>

        ))}

      </select>
      <section>
        { mealsByArea.map((el, index) => (
          <div
            data-testid={ `${index}-recipe-card` }
            onClick={ () => redirect(el.idMeal) }
            key={ el.idMeal }
            aria-hidden="true"
          >
            <p
              data-testid={ `${index}-card-name` }
            >
              { el.strMeal }
            </p>
            <img
              data-testid={ `${index}-card-img` }
              src={ el.strMealThumb }
              alt=""
              width="300"
            />
          </div>
        )) }
      </section>
      <InferiorMenu />
    </div>
  );
}
