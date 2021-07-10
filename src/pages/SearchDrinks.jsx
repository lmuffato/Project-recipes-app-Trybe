import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomDrink } from '../services/getApis';

function SearchDrinks() {
  const [randomMeal, setRandomMeal] = useState();
  const history = useHistory();

  const handleClick = async () => {
    const result = await fetchRandomDrink();
    setRandomMeal(result.drinks[0].idDrink);
  };

  useEffect(() => {
    if (randomMeal) history.push(`/bebidas/${randomMeal}`);
  }, [randomMeal]);

  return (
    <div>
      Pagina SearchDrinks
      <Header title="Explorar Bebidas" />
      <div>
        <Link to="/explorar/bebidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
          >
            Por Ingredientes
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default SearchDrinks;
