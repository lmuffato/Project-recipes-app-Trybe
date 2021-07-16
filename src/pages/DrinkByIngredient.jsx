import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import InferiorMenu from '../components/InferiorMenu';

export default function DrinkByIngredient() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    const drinkResults = async () => {
      const cocktail = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
      const responseDrinks = await cocktail.json();
      const { drinks } = responseDrinks;
      const indexDrinks = 12;
      const twelveDrinksIngredients = drinks.slice(0, indexDrinks);
      setIngredients(twelveDrinksIngredients);
    };
    drinkResults();
  }, []);

  return (
    <div>
      <Header>
        <h1 data-testid="page-title">Explorar Ingredientes</h1>
      </Header>
      <section>
        { ingredients.map((el, index) => (
          <div
            data-testid={ `${index}-ingredient-card` }
            key={ el.idIngredient1 }
          >
            <p data-testid={ `${index}-card-name` }>
              { el.strIngredient1 }
            </p>
            <img
              src={ `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png` }
              alt=""
              data-testid={ `${index}-card-img` }
            />
          </div>
        )) }
      </section>
      <InferiorMenu />
    </div>
  );
}
