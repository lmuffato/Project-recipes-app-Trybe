import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import MealsCard from '../../Components/MealsCard';
import { fetchAllOrigin, fetchByArea, fetchItAll } from '../../services/fetchRecipes';

function MealsByOrigin() {
  const [data, setData] = useState([]);
  const [areas, setAreas] = useState();

  const handleChange = async ({ target: { value } }) => (
    value === 'All' ? setData(await fetchItAll(''))
      : setData(await fetchByArea(value))
  );

  useEffect(() => {
    const getAreas = async () => setAreas(await fetchAllOrigin());
    const getData = async () => setData(await fetchItAll(''));
    getAreas();
    getData();
  }, []);

  const dropdown = (testid, id, options) => (
    <select className="select" data-testid={ testid } id={ id } onChange={ handleChange }>
      <option data-testid="All-option" value="All">All</option>
      { options.map(({ strArea: area }) => (
        <option
          data-testid={ `${area}-option` }
          id={ area }
          key={ area }
          value={ area }
        >
          { area }
        </option>)) }
    </select>
  );

  if (!areas) return <div>Loading...</div>;

  return (
    <section>
      <Header>Explorar Origem</Header>
      { dropdown('explore-by-area-dropdown', 'explore-by-area', areas.meals) }
      <MealsCard data={ data } />
      <Footer />
    </section>
  );
}

export default MealsByOrigin;
