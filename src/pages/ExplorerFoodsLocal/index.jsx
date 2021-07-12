import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import ItemCard from '../../components/ItemCard';
import { fetchArea, fetchRecipes } from '../../service/recipesApi';

function ExplorerFoodsLocal() {
  const [areas, setAreas] = useState([]);
  const [recipes, setRecipes] = useState([]);
  const [selectArea, setSelectArea] = useState('All');

  function handleChange(event) {
    setSelectArea(event.target.value);
  }

  async function getDataRecipes() {
    const data = await fetchRecipes(selectArea);
    setRecipes(data);
  }

  useEffect(() => {
    async function getDataAreas() {
      const data = await fetchArea();
      setAreas(data);
    }
    getDataAreas();
    getDataRecipes();
  }, []);

  useEffect(() => {
    getDataRecipes();
  }, [selectArea]);

  if (areas.length === 0) return 'Loading...';

  return (
    <>
      <Header
        location={ { pathname: '' } }
        pageTitle="Explorar Origem"
        showButton={ false }
      />
      <select
        data-testid="explore-by-area-dropdown"
        onChange={ (event) => handleChange(event) }
      >
        <option data-testid="All-option">All</option>
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
              dataTestId={ index.toString() }
            />
          </Link>
        ))}
      </div>
      <Footer />
    </>
  );
}

export default ExplorerFoodsLocal;
