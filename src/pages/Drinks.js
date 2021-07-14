import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../compenents/Footer';
import Header from '../compenents/Header';
import SearchbarContext from '../contexts/SearchbarContext';

function Drinks() {
  const [idDrink, setIdDrink] = useState();
  const { setHideSearchBtn, setPageName } = useContext(SearchbarContext);

  useEffect(() => {
    const getRandomFoodRecepie = async () => {
      const myFetch = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
        .then((response) => response.json())
        .then((respo) => respo);
      const saveIdDrink = myFetch.drinks[0].idDrink;
      console.log(myFetch);
      setIdDrink(saveIdDrink);
    };
    getRandomFoodRecepie();
    setHideSearchBtn(false);
    setPageName('Explorar Bebidas');
  }, []);

  return (
    <>
      <Header />
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
      <Footer />
    </>
  );
}

export default Drinks;
