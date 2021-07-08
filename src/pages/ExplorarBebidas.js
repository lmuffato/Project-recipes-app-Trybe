import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/mealAPI';

export default function ExplorarBebidas() {
  const [randomDrinkId, setRandomDrinkId] = useState(0);

  useEffect(() => {
    fetchRandomDrink().then((res) => setRandomDrinkId(res.drinks[0].idDrink));
  }, []);

  return (
    <div>
      <Header
        title="Explorar Bebidas"
        enableSearchIcon={ false }
      />
      <Link to="/explorar/bebidas/ingredientes">
        <button
          type="submit"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to={ `/bebidas/${randomDrinkId} ` }>
        <button
          type="submit"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
      <Footer />
    </div>
  );
}
