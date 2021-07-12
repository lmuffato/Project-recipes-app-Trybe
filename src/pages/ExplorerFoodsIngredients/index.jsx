// import { number, string } from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import recipesContext from '../../context/recipesContext/recipesContext';

import { fetchURLIngredients } from '../../utils/functions';

const MAX_INGREDIENT = 12;

function ExplorerFoodsIngredients() {
  const { setForIngredients } = useContext(recipesContext);
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
        <button type="button" key={ index } onClick={ () => setForIngredients(true) }>
          <Link to={ { pathname: '/comidas', state: strIngredient } }>
            <section data-testid={ `${index}-ingredient-card` }>
              <img
                width="200"
                data-testid={ `${index}-card-img` }
                src={ fetchURLIngredients(strIngredient, 'comida') }
                alt={ strIngredient }
              />
              <p data-testid={ `${index}-card-name` }>{strIngredient}</p>
            </section>
          </Link>

        </button>
      )) : <p>Loading ...</p>}
      <Footer />
    </>
  );
}

export default ExplorerFoodsIngredients;
