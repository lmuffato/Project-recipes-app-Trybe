import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

async function fecthRandomApiMeal() {
  const response = await fetch(
    'https://www.themealdb.com/api/json/v1/1/random.php',
  );
  const randomMeal = await response.json();
  return randomMeal.meals[0];
}

function ExplorarComidas() {
  const [idMeal, setIdMeal] = useState('');

  useEffect(() => {
    const getMealId = async () => {
      const idNumber = await fecthRandomApiMeal();
      setIdMeal(idNumber.idMeal);
    };
    getMealId();
  }, []);

  return (
    <section>
      <Header title="Explorar Comidas" show={ false } />

      <div className="explore">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${idMeal}` }>
          <button
            type="button"
            data-testid="explore-surprise"
          >
            Me Surpreenda!
          </button>
        </Link>
      </div>

      <Footer />
    </section>);
}

export default ExplorarComidas;
