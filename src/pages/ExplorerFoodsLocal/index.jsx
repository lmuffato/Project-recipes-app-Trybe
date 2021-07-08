import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ItemCard from '../../components/ItemCard';

function ExplorerFoodsLocal() {
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectArea, setSelectArea] = useState('American');

  async function fetchArea() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    const response = await fetch(URL);
    const data = await response.json();
    console.log(data);
    setAreas(data.meals);
  }

  async function fetchRecipes() {
    const URL = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectArea}`;
    console.log(URL);
    const response = await fetch(URL);
    const data = await response.json();
    const maxMeals = 12;
    const meals = data.meals.slice(0, maxMeals);
    console.log(meals);
    setRecipes(meals);
  }

  function handleChange(event) {
    setSelectArea(event.target.value);
    fetchRecipes();
  }

  useEffect(() => {
    fetchArea();
    fetchRecipes();
  }, []);

  if (areas.length === 0 && recipes.length === 0) return 'Loading...';

  return (
    <>
      <Header pageTitle="Explorar Origem" />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (event) => handleChange(event) }
      >
        {areas.map((area) => (
          <option data-testid={ `${area.strArea}-option` } key={ area.strArea }>
            {area.strArea}
          </option>
        ))}
      </select>
      <div>
        {recipes.map((recipe, index) => (
          <Link to={ `/comidas/${recipe.idMeal}` } key={ recipe.idMeal }>
            <ItemCard
              name={ recipe.strMeal }
              image={ recipe.strMealThumb }
              dataTestId={ index }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ExplorerFoodsLocal;
