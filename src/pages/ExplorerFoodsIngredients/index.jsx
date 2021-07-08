// import { number, string } from 'prop-types';
import React, { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';

import { fetchURLIngredients } from '../../utils/functions';

const MAX_INGREDIENT = 12;

function ExplorerFoodsIngredients() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const request = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      const data = await request.json();
      const filterIngredients = data.meals
        .filter((meals, index) => index < MAX_INGREDIENT);
      console.log(filterIngredients);
      setIngredients(filterIngredients);
    }
    fetchIngredients();
  }, []);

  return (
    <>
      <Header showButton={ false } pageTitle="Explorar Ingredientes" />
      {ingredients.length > 1 ? ingredients.map(({ strIngredient }, index) => (
        <section key={ index } data-testid={ `${index}-ingredient-card` }>
          <img
            width="200"
            data-testid={ `${index}-card-img` }
            src={ fetchURLIngredients(strIngredient, 'comida') }
            alt={ strIngredient }
          />
          <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
        </section>
      )) : <p>Loading ...</p>}
      <Footer />
    </>
  );
}

export default ExplorerFoodsIngredients;
