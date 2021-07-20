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
    <div className="explorar-bebidas">
      <Header
        title="Explore Drinks"
        enableSearchIcon={ false }
      />
      <div>
        <div className="explorar-bebidas-main">
          <Link to="/explorar/bebidas/ingredientes">
            <button
              className="button is-primary"
              type="submit"
              data-testid="explore-by-ingredient"
            >
              By Ingredients
            </button>
          </Link>
          <br />
          <Link to={ `/bebidas/${randomDrinkId} ` }>
            <button
              className="button is-warning"
              type="submit"
              data-testid="explore-surprise"
            >
              Surprise-me!
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
