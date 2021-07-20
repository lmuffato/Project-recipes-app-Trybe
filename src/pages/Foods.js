import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';

function Foods() {
  const [idMeal, setIdMeal] = useState();
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);

  useEffect(() => {
    const getRandomFoodRecepie = async () => {
      const myFetch = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then((respo) => respo);
      const saveIdMeal = myFetch.meals[0].idMeal;
      console.log(myFetch);
      setIdMeal(saveIdMeal);
    };
    getRandomFoodRecepie();
    setHideSearchBtn(false);
    setPageName('Explorar Comidas');
  }, []);

  return (
    <>
      <Header />
      <main className="main-explore">
        <Link to="/explorar/comidas/ingredientes">
          <button
            type="button"
            data-testid="explore-by-ingredient"
            className="button explore-button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            type="button"
            data-testid="explore-by-area"
            className="button explore-button"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${idMeal}` }>
          <button
            type="button"
            data-testid="explore-surprise"
            className="button explore-button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default Foods;
