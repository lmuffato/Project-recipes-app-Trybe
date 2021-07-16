import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomFood } from '../services/mealAPI';
import '../style/ExplorarComidas.css';

export default function ExplorarComidas() {
  const [randomFoodId, setRandomFoodId] = useState(0);
  useEffect(() => {
    fetchRandomFood().then((res) => setRandomFoodId(res.meals[0].idMeal));
  }, []);

  return (
    <div className="explorar-comidas">
      <Header
        title="Explorar Comidas"
        enableSearchIcon={ false }
      />
      <div>
        <div className="explorar-comidas-main">
          <Link to="/explorar/comidas/ingredientes">
            <button
              className="button is-primary"
              type="submit"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <br />
          <Link to="/explorar/comidas/area">
            <button
              className="button is-primary"
              id="explore-by-area"
              type="submit"
              data-testid="explore-by-area"
            >
              Por Local de Origem
            </button>
          </Link>
          <br />
          <Link to={ `/comidas/${randomFoodId} ` }>
            <button
              className="button is-primary"
              type="submit"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
      </div>
    <Footer />
    </div>
  );
}
