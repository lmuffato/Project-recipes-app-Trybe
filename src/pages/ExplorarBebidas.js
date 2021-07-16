import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/cocktailAPI';
import '../style/ExplorarBebidas.css';

export default function ExplorarBebidas() {
  const [randomDrinkId, setRandomDrinkId] = useState(0);

  useEffect(() => {
    fetchRandomDrink().then((res) => setRandomDrinkId(res.drinks[0].idDrink));
  }, []);

  return (
    <>
      <Header
        title="Explorar Bebidas"
        enableSearchIcon={ false }
      />
      <div>
        <div className="explorar-bebidas">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              className="button is-primary"
              type="submit"
              data-testid="explore-by-ingredient"
            >
              Por Ingredientes
            </button>
          </Link>
          <br />
          <Link to={ `/bebidas/${randomDrinkId} ` }>
            <button
              className="button is-primary"
              type="submit"
              data-testid="explore-surprise"
            >
              Me Surpreenda!
            </button>
          </Link>
        </div>
        <Footer />
      </div>
    </>
  );
}
