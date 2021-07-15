import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';
import Footer from '../components/Footer';

async function fecthRandomApiDrinks() {
  const response = await fetch(
    'https://www.thecocktaildb.com/api/json/v1/1/random.php',
  );
  const randomDrink = await response.json();
  return randomDrink.drinks[0];
}

function ExplorarBebidas() {
  const [idDrink, setIdDrink] = useState('');

  useEffect(() => {
    const getDrinkId = async () => {
      const idNumber = await fecthRandomApiDrinks();
      setIdDrink(idNumber.idDrink);
    };
    getDrinkId();
  }, []);

  return (
    <section>
      <Header title="Explorar Bebidas" show={ false } />

      <div className="explore">
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to={ `/bebidas/${idDrink}` }>
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

export default ExplorarBebidas;
