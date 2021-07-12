import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/shared/button';
// import { getRamdomFood } from '../../service/recipesApi';
import {
  propsButtonExploreByArea,
  propsButtonExploreByIngredient,
  propsButtonExploreSurprise,
} from './data';

function ExplorerFoods() {
  const [randomId, setRandomId] = useState('');

  async function getRamdomFood() {
    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const request = await fetch(URL);
    const data = await request.json();
    setRandomId(data);
  }

  useEffect(() => {
    getRamdomFood();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Comidas" showButton={ false } />
      <div>
        <Link to="/explorar/comidas/ingredientes">
          <Button { ...propsButtonExploreByIngredient } />
        </Link>
        <Link to="/explorar/comidas/area">
          <Button { ...propsButtonExploreByArea } />
        </Link>
        <Link to={ randomId === '' ? null : `/comidas/${randomId.meals[0].idMeal}` }>
          <Button { ...propsButtonExploreSurprise } />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExplorerFoods;
