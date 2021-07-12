import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import recipesContext from '../../context/recipesContext/recipesContext';

import { fetchURLIngredients } from '../../utils/functions';

const MAX_INGREDIENT = 12;

function ExplorerDrinksIngredients() {
  const { setForIngredients } = useContext(recipesContext);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    async function fetchIngredients() {
      const request = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const data = await request.json();
      const filterIngredients = data.drinks
        .filter((meals, index) => index < MAX_INGREDIENT);
      setIngredients(filterIngredients);
    }
    fetchIngredients();
  }, []);

  return (
    <>
      <Header pageTitle="Explorar Ingredientes" showButton={ false } />
      {ingredients.length > 1 ? ingredients.map(({ strIngredient1 }, index) => (
        <button key={ index } type="button" onClick={ () => setForIngredients(true) }>
          <Link to={ { pathname: '/bebidas', state: strIngredient1 } }>
            <section data-testid={ `${index}-ingredient-card` }>
              <img
                width="200"
                data-testid={ `${index}-card-img` }
                src={ fetchURLIngredients(strIngredient1) }
                alt={ strIngredient1 }
              />
              <p data-testid={ `${index}-card-name` }>{strIngredient1}</p>
            </section>
          </Link>
        </button>
      )) : <p>Loading ...</p>}
      <Footer />
    </>
  );
}

export default ExplorerDrinksIngredients;
