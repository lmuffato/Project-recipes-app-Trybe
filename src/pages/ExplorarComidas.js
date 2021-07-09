import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomFood } from '../services/mealAPI';

export default function ExplorarComidas() {
  const [randomFoodId, setRandomFoodId] = useState(0);
  useEffect(() => {
    fetchRandomFood().then((res) => setRandomFoodId(res.meals[0].idMeal));
  }, []);

  return (
    <div>
      <Header
        title="Explorar Comidas"
        enableSearchIcon={ false }
      />
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="submit"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>

      <Link to="/explorar/comidas/area">
        <button
          id="explore-by-area"
          type="submit"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>

      <Link to={ `/comidas/${randomFoodId} ` }>
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
