import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Foods() {
  const [idMeal, setIdMeal] = useState()

  useEffect(() => {
    const getRandomFoodRecepie = async () => {
      const myFetch = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
        .then((response) => response.json()) 
        .then((respo) => respo);
      const saveIdMeal = myFetch.meals[0].idMeal;
      console.log(myFetch);
      setIdMeal(saveIdMeal);
    }
    getRandomFoodRecepie();
  }, [])


  return (
    <div>
      <Link to="/explorar/comidas/ingredientes">
        <button
          type="button"
          data-testid="explore-by-ingredient"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to="/explorar/comidas/area">
        <button
          type="button"
          data-testid="explore-by-area"
        >
          Por Local de Origem
        </button>
      </Link>
      <Link to={`/comidas/${idMeal}`}>
        <button
          type="button"
          data-testid="explore-surprise"
        >
          Me Surpreenda!
        </button>
      </Link>
    </div>
  );
}

export default Foods;
