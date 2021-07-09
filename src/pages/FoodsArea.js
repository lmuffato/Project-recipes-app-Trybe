import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import MealCards from '../compenents/MealCards';
import SearchbarContext from '../contexts/SearchbarContext';
import '../styles/MealAndDrinkCards.css';

function FoodsArea() {
  const [areas, setAreas] = useState([]);
  const [mealsRecepies, setMealsRecepies] = useState([]);
  const [selectedArea, setSelectedArea] = useState('All');
  const [showRecepies, setShowRecepies] = useState(mealsRecepies);
  const { setHideSearchBtn } = useContext(SearchbarContext);
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
      setHideSearchBtn(true);
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

  async function getFiltredFetch() {
    const filteredFetch = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`)
      .then((responses) => responses.json())
      .then((respos) => respos.meals);
    console.log(filteredFetch);
    const fils = filteredFetch.filter((element, index) => index < lastRecipe);
    setShowRecepies(fils);
  }

  useEffect(() => {
    console.log(selectedArea);
    if (selectedArea === 'All') {
      setShowRecepies(mealsRecepies.slice(0, lastRecipe));
    } else {
      getFiltredFetch();
    }
  }, [selectedArea, mealsRecepies]);

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default FoodsArea;
