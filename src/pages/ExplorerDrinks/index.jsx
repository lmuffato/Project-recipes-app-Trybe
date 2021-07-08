import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Button from '../../components/shared/button';
import { propsButtonExploreByIngredient, propsButtonExploreSurprise } from './data';

function ExplorerDrinks() {
  const [randomId, setRandomId] = useState('');

  async function getRamdomDrink() {
    const URL = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const request = await fetch(URL);
    const data = await request.json();
    setRandomId(data);
  }

  useEffect(() => {
    getRamdomDrink();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Bebidas" showButton={ false } />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <Button { ...propsButtonExploreByIngredient } />
        </Link>
        <Link to={ randomId === '' ? null : `/bebidas/${randomId.drinks[0].idDrink}` }>
          <Button { ...propsButtonExploreSurprise } />
        </Link>
      </div>
      <Footer />
    </>
  );
}

export default ExplorerDrinks;
