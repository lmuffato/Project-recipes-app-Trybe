import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchRandomMeal } from '../services/getApis';

function SearchMeals() {
  const [randomMeal, setRandomMeal] = useState();
  const history = useHistory();

  const handleClick = async () => {
    const result = await fetchRandomMeal();
    setRandomMeal(result.meals[0].idMeal);
  };

  useEffect(() => {
    if (randomMeal) history.push(`/comidas/${randomMeal}`);
  }, [randomMeal]);

  return (
    <div>
      <Header title="Explorar Comidas" />
      <div className="cardsGroup">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="itemCard exploreButtons"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            className="itemCard exploreButtons"
          >
            Por Local de Origem
          </button>
        </Link>
        <button
          type="button"
          data-testid="explore-surprise"
          onClick={ handleClick }
          className="itemCard exploreButtons"
        >
          Me Surpreenda!
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default SearchMeals;
