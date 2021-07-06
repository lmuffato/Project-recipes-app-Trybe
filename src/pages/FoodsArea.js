import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MealCards from '../compenents/MealCards';
import '../styles/MealAndDrinkCards.css';

function FoodsArea() {
  const [areas, setAreas] = useState([]);
  const [mealsRecepies, setMealsRecepies] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [showRecepies, setShowRecepies] = useState(mealsRecepies);
  const lastRecipe = 12;

  useEffect(() => {
    const getAreas = async () => {
      const fetchArea = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
        .then((response) => response.json())
        .then((respo) => respo);
      const allAreas = fetchArea.meals.map((country) => (
        country.strArea
      ));
      setAreas(allAreas);
    };
    getAreas();

    const getMealsRecepies = async () => {
      const fetchRecepies = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((responses) => responses.json())
        .then((respos) => respos.meals);
      setMealsRecepies(fetchRecepies);
      setShowRecepies(fetchRecepies.slice(0, lastRecipe));
    };

    getMealsRecepies();
  }, []);

  useEffect(() => {
    if (selectedArea === 'All') {
      setShowRecepies(mealsRecepies.slice(0, lastRecipe));
    } else {
      async function getFiltredFetch() {
        console.log('entrou na função de fetch filtro');
        const filteredFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
        .then((responses) => responses.json())
        .then((respos) => respos.meals);
        /* const filteredRecepies = mealsRecepies.filter((recepi) => (
          recepi.strArea === selectedArea
          )); */
          console.log('filteredFetch')
          console.log((filteredFetch));
          setShowRecepies(filteredFetch.slice(0, lastRecipe));
        }
        getFiltredFetch();
      }
    console.log(showRecepies)
  }, [selectedArea, mealsRecepies]);

  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (e) => setSelectedArea(e.target.value) }
        value={ selectedArea }
      >
        <option data-testid="All-option">All</option>
        {areas.map((area, index) => (
          <option key={ index } data-testid={ `${area}-option` }>{area}</option>
        ))}
      </select>
      <section className="recipes-container">
        {showRecepies.map((recepie, index) => (
          <Link key={ index } to={ `/comidas/${recepie.idMeal}` }>
            <MealCards
              data={ recepie }
              index={ index }
              key={ recepie.idMeal }
            />
          </Link>
        ))}
      </section>
    </div>
  );
}

export default FoodsArea;
